"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { getDraftOrderById } from "components/checkout/actions";
import { CheckoutPageShimmer } from "components/checkout/components/Shimmer/CheckoutPageShimmer";
import { OrderInformation } from "components/common/components/OrderInformation";
import { FEE, NANOTONS_IN_TON, Routes } from "components/constants";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { getValueFromTelegramCloudStorage } from "lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type FunctionComponent } from "react";

import type { SendTransactionRequest } from "@tonconnect/ui-react";
import type { DraftOrder } from "lib/shopify/admin/types";

export const CheckoutPage: FunctionComponent = () => {
  const { total } = useCartDataConductor();
  const [isPending, startTransition] = useTransition();
  const [draftOrder, setDraftOrder] = useState<DraftOrder | null>(null);
  const router = useRouter();

  const { MainButton } = useWebAppDataConductor();
  const [tonConnectUI] = useTonConnectUI();

  const handleCheckout = () => {
    startTransition(() => {
      MainButton.hide();
      const amount = String(NANOTONS_IN_TON * (Number(total) + FEE));
      const address = process.env.NEXT_PUBLIC_TON_WALLET_ADDRESS;

      if (!address) {
        // TODO error handling
        return;
      }

      const TRANSACTION: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() + 1000000),
        messages: [
          {
            address,
            amount
          }
        ]
      };

      tonConnectUI
        .sendTransaction(TRANSACTION)
        .then(() => {
          router.push(Routes.CheckoutProcessing.replace(":amount", amount));
        })
        .finally(() => {
          MainButton.show();
        });
    });
  };

  useEffect(() => {
    startTransition(async () => {
      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      getDraftOrderById(draftOrderId).then(({ data, success, error }) => {
        if (success) {
          setDraftOrder(data);
        }

        if (error) {
          // TODO ADD
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!total) {
      MainButton.hide();

      return;
    }

    MainButton.show();
    MainButton.setText(`Pay ${total} TON`);
    MainButton.color = "#007AFF";
    MainButton.textColor = "#FFF";
    MainButton.onClick(handleCheckout);

    return () => MainButton.offClick(handleCheckout);
  }, [total]);

  if (isPending || !draftOrder || !total) {
    return <CheckoutPageShimmer title="Checkout" />;
  }

  const { lineItems, customAttributes } = draftOrder ?? {};

  const address = customAttributes.find((item) => item.key === "shippingInformation")?.value ?? "";
  const name = customAttributes.find((item) => item.key === "name")?.value ?? "";
  const phone = customAttributes.find((item) => item.key === "phone")?.value ?? "";

  return (
    <div className="pt-6">
      <BackButton />

      <OrderInformation
        title="Checkout"
        walletAddress={draftOrder.poNumber}
        lineItems={lineItems}
        name={name}
        address={address}
        phone={phone}
        linkHref={Routes.CheckoutEdit}
        total={total}
      />
    </div>
  );
};
