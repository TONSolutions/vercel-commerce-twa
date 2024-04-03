//TODO add metadata

import { CheckoutPage } from "components/checkout/checkout";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  return <CheckoutPage />;
}
