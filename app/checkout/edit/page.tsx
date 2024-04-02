//TODO add metadata

import { CheckoutEditPage } from "components/checkout/checkout-edit";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  return <CheckoutEditPage />;
}
