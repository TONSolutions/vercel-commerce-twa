import { OrderStatus, OrderType } from "components/orders/constants";

import type { CustomAttribute } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";

export const getAddress = ({
  type,
  locations,
  customAttributes
}: {
  type: OrderType;
  locations: ShopifyLocation[];
  customAttributes: CustomAttribute[];
}) => {
  const rawLocation =
    customAttributes.find((item) => item.key === "shippingInformation")?.value ?? "";

  if (type === OrderType.Finished) {
    return rawLocation;
  }

  const location = locations.find(
    (location) => `${location.address.city}, ${location.address.countryCode}` === rawLocation
  );

  return `${location?.address.city}, ${location?.address.country}, ${location?.address.address1}`;
};

export const getContentByStatusAndType = ({
  type,
  status,
  address,
  deliveryDate,
  deliveryEstimationDate
}: {
  type: OrderType;
  status: OrderStatus;
  address: string;
  deliveryDate: string;
  deliveryEstimationDate?: string;
}) => {
  if (type === OrderType.Finished) {
    return {
      title: "Delivered",
      subtitle: `${address} ${String.fromCharCode(183)} ${deliveryDate}`
    };
  }

  if (type === OrderType.Active && status === OrderStatus.Ready) {
    return {
      title: "Arrived. Pick up your order",
      subtitle: address
    };
  }

  if (type === OrderType.Active && status === OrderStatus.Created && !deliveryEstimationDate) {
    return { title: "Collecting order", subtitle: `Delivery date is calculating` };
  }

  if (type === OrderType.Active && status === OrderStatus.Created && deliveryEstimationDate) {
    return { title: "Collecting order", subtitle: `Delivery date: ${deliveryEstimationDate}` };
  }

  return { title: "", subtitle: "" };
};
