"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { CheckoutItems } from "components/checkout/components/CheckoutItems";
import { Option } from "components/checkout/components/Option";
import { TotalSection } from "components/checkout/components/TotalSection";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { request } from "lib/requets";
import { getValueFromTelegramCloudStorage } from "lib/utils";
import Link from "next/link";
import { useEffect, useState, useTransition, type FunctionComponent } from "react";

import type { DraftOrder } from "lib/shopify/admin/types";

//TODO use components from Konsta UI

export const CheckoutPage: FunctionComponent = () => {
  const { total } = useCartDataConductor();
  const [isPending, startTransition] = useTransition();
  const [draftOrder, setDraftOrder] = useState<DraftOrder | null>(null);

  const { MainButton } = useWebAppDataConductor();

  const handleCheckout = () => {
    //TODO add
    console.log("triggered");
  };

  useEffect(() => {
    startTransition(async () => {
      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      const draftOrder = await request<DraftOrder>("/api/draft-order", { body: { draftOrderId } });

      setDraftOrder(draftOrder);
    });
  }, []);

  useEffect(() => {
    MainButton.setText(`Pay ${total} TON`);
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
