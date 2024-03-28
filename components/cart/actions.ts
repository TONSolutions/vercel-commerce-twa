"use server";

import { TAGS } from "lib/constants";
import { addToCart, createCart, removeFromCart, updateCart } from "lib/shopify";
import { revalidateTag } from "next/cache";

export const addItem = async (selectedVariantId: string, cartId: string | undefined) => {
  if (cartId) {
    //User try to add item to existing cart;
    try {
      await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
      revalidateTag(TAGS.cart);

      return null;
    } catch (error) {
      console.error(error);

      return null;
    }
  } else {
    //User try to add item first time
    const cart = await createCart();
    const cartId = cart.id;

    try {
      await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
      revalidateTag(TAGS.cart);

      return cartId;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
};

export const removeItem = async (lineId: string) => {
  const cartId = ""; //TODO прокидывать снаружи

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
};

export const updateItemQuantity = async (payload: {
  lineId: string;
  variantId: string;
  quantity: number;
}) => {
  const cartId = ""; //TODO прокидывать снаружи

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);

      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
};
