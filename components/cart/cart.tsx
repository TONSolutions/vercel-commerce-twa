"use client";

import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { checkoutCart } from "components/cart/actions";
import { CartList } from "components/cart/components/CartList";
import { CartTitleSection } from "components/cart/components/CartTitleSection";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import {
  createReserveTimestamp,
  getValueFromTelegramCloudStorage,
  setValueFromTelegramCloudStorage,
  truncateMiddle
} from "lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useTransition, type FunctionComponent } from "react";

import type { DraftOrderInput } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";

//TODO add check for items in cart with 0 quantity – they are sold, we need to remove them and notify the user
//gid://shopify/Cart/c1-f1feed27b05066ff619afbcadf8be935

type Props = {
  locations: ShopifyLocation[];
};

export const CartPage: FunctionComponent<Props> = ({ locations }) => {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const { total } = useCartDataConductor();
  const [isPending, startTransition] = useTransition();
  const { cart } = useCartDataConductor();

  const [connectUI] = useTonConnectUI();
  const {
    MainButton,
    initDataUnsafe: { user }
  } = useWebAppDataConductor();

  const router = useRouter();

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

      checkoutCart(input, draftOrderId).then(({ data, error, success }) => {
        if (success) {
          console.log("data", data);
          const { id } = data;
          setValueFromTelegramCloudStorage("draftOrderId", id);
          router.push("/checkout");
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

  return (
    <>
      <div className="min-h-screen bg-bg_color px-4 py-6">
        <div className="flex flex-col gap-4">
          <BackButton />

          <CartTitleSection />

          <CartList />
        </div>
      </div>
    </>
  );
};
