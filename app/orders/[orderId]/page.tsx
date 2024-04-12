//TODO add metadata

import { OrderPage } from "components/orders/order";
import { getOrder } from "lib/shopify/admin";
import { prepareShopifyIdForRequest } from "lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { orderId: string } }) {
  const order = await getOrder(prepareShopifyIdForRequest(`/${params.orderId}`, "Order"));

  if (!order) {
    return notFound();
  }

  return <OrderPage order={order} />;
}
