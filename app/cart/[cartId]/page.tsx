//TODO add metadata
import { CartPage } from "components/cart/cart";
import { getCart } from "lib/shopify";
import { prepareCartIdForRequest } from "lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { cartId: string } }) {
  const cart = await getCart(prepareCartIdForRequest(`/${params.cartId}`));

  if (!cart) {
    return notFound(); //TODO redirect on empty cart state
  }

  return <CartPage cart={cart} />;
}
