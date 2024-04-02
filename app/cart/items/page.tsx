//TODO add metadata
import { CartPage } from "components/cart/cart";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page() {
  return <CartPage />;
}
