//TODO add metadata

import { CheckoutProcessingPage } from "components/checkout/checkout-processing";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { amount: string } }) {
  return <CheckoutProcessingPage amount={params.amount} />;
}
