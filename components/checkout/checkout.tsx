"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { CheckoutItems } from "components/checkout/components/CheckoutItems";
import { Option } from "components/checkout/components/Option";
import { TotalSection } from "components/checkout/components/TotalSection";
import { FEE, NANOTONS_IN_TON, Routes } from "components/constants";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { request } from "lib/requets";
import { getValueFromTelegramCloudStorage } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type FunctionComponent } from "react";

import type { SendTransactionRequest } from "@tonconnect/ui-react";
import type { DraftOrder } from "lib/shopify/admin/types";

//TODO use components from Konsta UI

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

      const TRANSACTION: SendTransactionRequest = {
        validUntil: Math.floor(Number(new Date()) / 1000),
        messages: [
          {
            address: "0:9bf8d856ecbadfdf472438f59a79d346928a51a08920061a573e720be16bbb3a", //TODO put to ENV
            amount
          }
        ]
      };

      tonConnectUI
        .sendTransaction(TRANSACTION)
        .then(() => {
          router.push(Routes.CheckoutProcessing);
        })
        .finally(() => {
          MainButton.show();
        });
    });
  };

  useEffect(() => {
    startTransition(async () => {
      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      const draftOrder = await request<DraftOrder>("/api/draft-order", { body: { draftOrderId } });

      setDraftOrder(draftOrder);
    });
  }, []);

  useEffect(() => {
    MainButton.show();
    MainButton.setText(`Pay ${total} TON`);
    MainButton.color = "#007AFF";
    MainButton.textColor = "#FFF";
    MainButton.onClick(handleCheckout);

    return () => MainButton.offClick(handleCheckout);
  }, []);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (!draftOrder) {
    return <h1>Loading</h1>;
  }

  const { lineItems, customAttributes } = draftOrder ?? {};

  const address = customAttributes.find((item) => item.key === "shippingInformation");
  const name = customAttributes.find((item) => item.key === "name");
  const paymentMethod = customAttributes.find((item) => item.key === "paymentMethod");

  return (
    <div className="px-4 pt-6">
      <BackButton />

      <div className="mb-6">
        <h1 className="mb-3 text-xl font-bold">Checkout</h1>

        <div className="divide-y divide-[#C8C7CB] rounded-xl bg-bg_color px-4 py-3">
          <CheckoutItems items={lineItems} />

          <TotalSection />
        </div>
      </div>

      <div className="rounded-xl bg-bg_color px-4 py-3">
        <Link href="/checkout/edit" className="divide-y divide-[#C8C7CB]">
          <Option title="Payment Method" option={paymentMethod?.value ?? ""} />

          <Option title="Shipping information" option={address?.value ?? ""} clickable />

          <Option title="Name" option={name?.value ?? ""} clickable />

          <Option title="Phone" option="" clickable />
        </Link>
      </div>
    </div>
  );
};
