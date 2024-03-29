//TODO add metadata
import { CartPage } from "components/cart/cart";
import { getCart } from "lib/shopify";
import { prepareCartIdForRequest } from "lib/utils";
import { redirect } from "next/navigation";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { cartId: string } }) {
  const cart = await getCart(prepareCartIdForRequest(`/${params.cartId}`));

  if (!cart || cart.totalQuantity === 0) {
    return redirect("/cart");
  }

  return <CartPage cart={cart} />;
}
