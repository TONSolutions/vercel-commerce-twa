//TODO add metadata

import { CheckoutPage } from "components/checkout/checkout";
import { getCompanyLocations } from "lib/shopify";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  const locations = await getCompanyLocations({ first: 10 });

  console.log(locations);

  return <CheckoutPage locations={locations} />;
}
