"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { getDraftOrderById } from "components/checkout/actions";
import { CheckoutItems } from "components/checkout/components/CheckoutItems";
import { TotalSection } from "components/checkout/components/TotalSection";
import { FEE, NANOTONS_IN_TON, Routes } from "components/constants";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { List, ListItem } from "konsta/react";
import { getValueFromTelegramCloudStorage, truncateMiddle } from "lib/utils";
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
  const phone = customAttributes.find((item) => item.key === "phone");

  return (
    <div className="pt-6">
      <BackButton />

      <h1 className="mb-3 px-4 text-xl font-bold">Checkout</h1>

      <div className="m-4 rounded-xl bg-bg_color">
        <CheckoutItems items={lineItems} />

        <TotalSection />
      </div>

      <List className="m-4 rounded-xl bg-bg_color" strongIos>
        <ListItem title="Payment Method" after={truncateMiddle(draftOrder.poNumber ?? "")} />

        <ListItem
          link
          href={Routes.CheckoutEdit}
          title="Shipping information"
          after={address?.value ?? ""}
        />

        <ListItem link href={Routes.CheckoutEdit} title="Name" after={name?.value ?? ""} />

        <ListItem link href={Routes.CheckoutEdit} title="Phone" after={phone?.value ?? ""} />
      </List>
    </div>
  );
};
