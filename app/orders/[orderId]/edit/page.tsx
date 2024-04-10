//TODO add metadata

import { EditOrderPage } from "components/orders/order-edit";
import { getOrder } from "lib/shopify/admin";
import { getCompanyLocations } from "lib/shopify/storefront";
import { prepareShopifyIdForRequest } from "lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { orderId: string } }) {
  const order = await getOrder(prepareShopifyIdForRequest(`/${params.orderId}`, "Order"));
  const locations = await getCompanyLocations({ first: 10 });

  if (!order) {
    return notFound();
  }

  return (
    <EditOrderPage
      orderId={order.id}
      customAttributes={order.customAttributes}
      locations={locations}
    />
  );
}
