"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { CartList } from "components/cart/components/CartList";
import { CartTitleSection } from "components/cart/components/CartTitleSection";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useRouter } from "next/navigation";
import { useEffect, type FunctionComponent } from "react";

//gid://shopify/Cart/c1-f1feed27b05066ff619afbcadf8be935
export const CartPage: FunctionComponent = () => {
  const wallet = useTonWallet();
  const { total } = useCartDataConductor();

  const [connectUI] = useTonConnectUI();
  const { MainButton } = useWebAppDataConductor();
  const router = useRouter();

  const handleCheckout = () => {
    router.push(`/checkout`);
  };

  const handleOpenWalletModal = () => {
    MainButton.hide();
    connectUI.modal.open();
  };

  useEffect(() => {
    MainButton.show();
    MainButton.setText(`Pay ${total} TON`);

    if (wallet) {
      MainButton.onClick(handleCheckout);

      return () => MainButton.offClick(handleCheckout);
    } else {
      MainButton.onClick(handleOpenWalletModal);

      return () => MainButton.offClick(handleOpenWalletModal);
    }
  }, [total, wallet]);

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
