"use client";
import { BackButton } from "@twa-dev/sdk/react";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useEffect, type FunctionComponent } from "react";

import type { Order } from "lib/shopify/admin/types";

type Props = {
  order: Order;
};

export const EditOrderPage: FunctionComponent<Props> = ({ order }) => {
  const { MainButton } = useWebAppDataConductor();

  const { poNumber, name: orderName, lineItems, customAttributes, id } = order;

  const address = customAttributes.find((item) => item.key === "shippingInformation")?.value ?? "";
  const name = customAttributes.find((item) => item.key === "name")?.value ?? "";
  const phone = customAttributes.find((item) => item.key === "phone")?.value ?? "";

  useEffect(() => {
    MainButton.hide();
  }, []);

  return (
    <div className="pt-6">
      <BackButton />

      <h1>ORDER!!</h1>
    </div>
  );
};
