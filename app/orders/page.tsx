//TODO add metadata

import { OrdersPage } from "components/orders/orders";
import { getCompanyLocations } from "lib/shopify/storefront";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  const locations = await getCompanyLocations({ first: 10 });
  // const data = new Promise<string>((resolve) => {
  //   setTimeout(() => resolve("hey"), 300000);
  // });

  return <OrdersPage locations={locations} />;
}
