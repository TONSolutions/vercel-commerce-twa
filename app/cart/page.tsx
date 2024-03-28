//TODO add metadata

import { EmptyCartPage } from "components/cart/cart-empty";

export const runtime = "edge";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  return <EmptyCartPage />;
}
