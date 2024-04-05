/* eslint-disable max-lines */
"use client";

import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { checkoutCart, clearCart } from "components/cart/actions";
import { CartList } from "components/cart/components/CartList";
import { CartTitleSection } from "components/cart/components/CartTitleSection";
import { Toaster } from "components/cart/components/Toaster";
import { Routes } from "components/constants";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import {
  createReserveTimestamp,
  getValueFromTelegramCloudStorage,
  prepareCartIdForRequest,
  setValueFromTelegramCloudStorage,
  truncateMiddle
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
  const { cart, cartId, setCart, total } = useCartDataConductor();
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
        { key: "paymentMethod", value: truncateMiddle(address) },
        {
          key: "shippingInformation",
          value: `${locations[0].address.city}, ${locations[0].address.countryCode}`
        },
        { key: "name", value: `${user?.first_name} ${user?.last_name}` }
      ];

      const lineItems = cart?.lines.map(({ quantity, merchandise }) => ({
        variantId: merchandise.id,
        quantity,
        title: merchandise.product.title
      }));

      const input: DraftOrderInput = {
        lineItems,
        reserveInventoryUntil: createReserveTimestamp(30),
        customAttributes
      };

      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      checkoutCart(input, draftOrderId).then(async ({ data, error, success }) => {
        if (success) {
          const { id } = data;
          setValueFromTelegramCloudStorage("draftOrderId", id);

          //TODO FINISH
          // if (customAttributes.find(({ key }) => key === "wasFiltered")) {
          //   MainButton.hide();
          //   setIsToastOpen(true);
          //   router.push(Routes.Checkout);

          //   return;
          // }

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
    MainButton.show();
    MainButton.setText(`Pay ${total} TON`);
    MainButton.color = "#007AFF";
    MainButton.textColor = "#FFF";
    isPending ? MainButton.showProgress() : MainButton.hideProgress();

    if (wallet) {
      MainButton.onClick(handleCheckout);

      return () => MainButton.offClick(handleCheckout);
    } else {
      MainButton.onClick(handleOpenWalletModal);

      return () => MainButton.offClick(handleOpenWalletModal);
    }
  }, [total, wallet, isPending]);

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
          clearCart(prepareCartIdForRequest(cartId), idsToRemove).then(
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

  if (isPending) {
    return <h1>Loading....</h1>;
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
