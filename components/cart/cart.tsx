/* eslint-disable max-lines */
"use client";

import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { checkoutCart, clearCart } from "components/cart/actions";
import { CartList } from "components/cart/components/CartList";
import { CartTitleSection } from "components/cart/components/CartTitleSection";
import { CartPageShimmer } from "components/cart/components/Shimmer/CartPageShimmer";
import { Toaster } from "components/cart/components/Toaster";
import { Routes } from "components/constants";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import {
  createReserveTimestamp,
  getValueFromTelegramCloudStorage,
  prepareShopifyIdForRequest,
  setValueFromTelegramCloudStorage
} from "lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type FunctionComponent } from "react";

import type { DraftOrderInput } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";

type Props = {
  locations: ShopifyLocation[];
};

export const CartPage: FunctionComponent<Props> = ({ locations }) => {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [isPending, startTransition] = useTransition();
  const { cart, cartId, setCart, total, loading: cartLoading } = useCartDataConductor();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const [connectUI] = useTonConnectUI();
  const {
    MainButton,
    initDataUnsafe: { user }
  } = useWebAppDataConductor();

  const router = useRouter();

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  const handleCheckout = () => {
    startTransition(async () => {
      const customAttributes = [
        {
          key: "shippingInformation",
          value: `${locations[0].address.city}, ${locations[0].address.countryCode}`
        },
        { key: "name", value: `${user?.first_name} ${user?.last_name}` },
        { key: "deliveryEstimation", value: String(new Date()) }
      ];

      const lineItems = cart?.lines.map(({ quantity, merchandise }) => ({
        variantId: merchandise.id,
        quantity,
        title: merchandise.product.title
      }));

      const input: DraftOrderInput = {
        lineItems,
        reserveInventoryUntil: createReserveTimestamp(30),
        customAttributes,
        poNumber: address // This is workaround: we set wallet's address as Post Office Number as this data is shared among Draft Order Update Input, Draft Order and Order and can be used to fetch them
      };

      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      checkoutCart(input, draftOrderId).then(async ({ data, error, success }) => {
        if (success) {
          const { id } = data;
          setValueFromTelegramCloudStorage("draftOrderId", id);

          router.push(Routes.Checkout);
        }

        if (error) {
          console.error(error);
          //TODO error handling
        }
      });
    });
  };

  const handleOpenWalletModal = () => {
    MainButton.hide();
    connectUI.modal.open();
  };

  useEffect(() => {
    if (!total) {
      MainButton.hide();

      return;
    }

    MainButton.show();
    MainButton.setText(`Pay ${total} TON`);
    MainButton.color = "#007AFF";
    MainButton.textColor = "#FFF";

    if (wallet) {
      MainButton.onClick(handleCheckout);

      return () => MainButton.offClick(handleCheckout);
    } else {
      MainButton.onClick(handleOpenWalletModal);

      return () => MainButton.offClick(handleOpenWalletModal);
    }
  }, [total, wallet, isPending, address]);

  useEffect(() => {
    connectUI.onModalStateChange((state) => {
      if (state.closeReason === "wallet-selected") {
        handleCheckout();
      }
    });
  }, [connectUI.modalState]);

  useEffect(() => {
    startTransition(async () => {
      const soldItems = cart?.lines.filter(({ quantity }) => quantity === 0);

      if (soldItems && soldItems.length > 0) {
        const idsToRemove = soldItems?.map(({ id }) => id);

        if (cartId) {
          clearCart(prepareShopifyIdForRequest(cartId), idsToRemove).then(
            ({ success, error, data }) => {
              if (success) {
                setCart(data);
                setIsToastOpen(true);
              }

              if (error) {
                // TODO
              }
            }
          );
        }
      }
    });
  }, [cart?.lines.length]);

  if (isPending || cartLoading) {
    return <CartPageShimmer />;
  }

  return (
    <>
      <div className="min-h-screen bg-bg_color px-4 py-6">
        <div className="flex flex-col gap-4">
          <BackButton />

          <CartTitleSection />

          <CartList />
        </div>
      </div>

      <Toaster
        isOpen={isToastOpen}
        buttonText="Fine"
        toastText="Unfortunately, some items are out of stock. We have removed them from your cart."
        onClose={handleToastClose}
      />
    </>
  );
};
