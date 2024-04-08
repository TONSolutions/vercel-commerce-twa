//TODO add metadata

import { OrdersPage } from "components/orders/orders";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  return <OrdersPage />;
}
