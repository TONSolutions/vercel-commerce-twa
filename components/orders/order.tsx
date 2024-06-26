"use client";
import { BackButton } from "@twa-dev/sdk/react";
import { OrderInformation } from "components/common/components/OrderInformation";
import { Routes } from "components/constants";
import { ContactSupportBlock } from "components/orders/components/ContactSupportBlock";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { prepareShopifyIdForUrl } from "lib/utils";
import { useEffect, type FunctionComponent } from "react";

import type { Order } from "lib/shopify/admin/types";

type Props = {
  order: Order;
};

export const OrderPage: FunctionComponent<Props> = ({ order }) => {
  const { MainButton } = useWebAppDataConductor();

  //TODO disable form editing if order is complete.

  const {
    poNumber,
    name: orderName,
    lineItems,
    customAttributes,
    id,
    currentSubtotalPriceSet,
    tags,
    displayFulfillmentStatus
  } = order;

  const address = customAttributes.find((item) => item.key === "shippingInformation")?.value ?? "";
  const name = customAttributes.find((item) => item.key === "name")?.value ?? "";
  const phone = customAttributes.find((item) => item.key === "phone")?.value ?? "";

  const total = currentSubtotalPriceSet.shopMoney.amount;

  const title = `Order ${orderName}`;

  const getDisabledFields = () => {
    if (displayFulfillmentStatus === "FULFILLED") {
      return { name: true, phone: true, shippingInformation: true };
    }

    if (tags.includes("Ready for pickup") && displayFulfillmentStatus === "UNFULFILLED") {
      return { name: false, phone: false, shippingInformation: true };
    }

    return { name: false, phone: false, shippingInformation: false };
  };

  const disabledFields = getDisabledFields();

  useEffect(() => {
    MainButton.hide();
  }, []);

  const handleContactSupportClick = () => {
    //TODO implement
  };

  return (
    <div className="pt-6">
      <BackButton />

      <OrderInformation
        title={title}
        walletAddress={poNumber}
        lineItems={lineItems}
        name={name}
        address={address}
        phone={phone}
        linkHref={Routes.OrderEdit.replace("/:id", prepareShopifyIdForUrl(id, "Order"))}
        total={total}
        disabledFields={disabledFields}
      />

      <ContactSupportBlock onClick={handleContactSupportClick} />
    </div>
  );
};
