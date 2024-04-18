//TODO add metadata
import { CartPage } from "components/cart/cart";
import { getCompanyLocations } from "lib/shopify/storefront";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  const locations = await getCompanyLocations({ first: 10 });

  return (
    <>
      <CartPage locations={locations} />
    </>
  );
}
