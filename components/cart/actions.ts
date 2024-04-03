"use server";

import { TAGS } from "lib/constants";
import { createDraftOrder } from "lib/shopify/admin";
import { addToCart, createCart, removeItems, updateCart } from "lib/shopify/storefront";
import { revalidateTag } from "next/cache";

import type { DraftOrderInput } from "lib/shopify/admin/types";
import type { Line } from "lib/shopify/storefront/types";

export const addItem = async (selectedVariantId: string, cartId: string | undefined) => {
  if (cartId) {
    //User try to add item to existing cart;
    try {
      const cart = await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
      revalidateTag(TAGS.cart);

      return { createdCartId: null, cart };
    } catch (error) {
      console.error(error);

      return { createdCartId: null, cart: null };
    }
  } else {
    //User try to add item first time
    const cart = await createCart();
    const cartId = cart.id;

    try {
      const cart = await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
      revalidateTag(TAGS.cart);

      return { createdCartId: cartId, cart };
    } catch (error) {
      console.error(error);

      return { createdCartId: null, cart: null };
    }
  }
};

export const clearCart = async (cartId: string, lineIds: string[]) => {
  if (!cartId) {
    throw new Error("No cart id provided");
  }

  try {
    const cart = await removeItems(cartId, lineIds);
    revalidateTag(TAGS.cart);

    return { data: cart, success: "Items successfully deleted" };
  } catch (error) {
    console.error(error);

    return {
      error: "Error updating item quantity"
    };
  }
};

export const updateItemQuantity = async (cartId: string, line: Line) => {
  if (!cartId) {
    throw new Error("No cart id provided");
  }

  const { id, quantity } = line;

  try {
    if (quantity === 0) {
      const cart = await removeItems(cartId, [id]);
      revalidateTag(TAGS.cart);

      return { data: cart, success: "Item successfully deleted" };
    }

    const cart = await updateCart(cartId, [
      {
        id,
        quantity
      }
    ]);

    revalidateTag(TAGS.cart);

    return { data: cart, success: "Item successfully updated" };
  } catch (error) {
    console.error(error);

    return {
      error: "Error updating item quantity"
    };
  }
};

export const checkoutCart = async (input: DraftOrderInput, draftOrderId: string) => {
  if (draftOrderId) {
    return { error: "No implemented yet" };
  } else {
    try {
      const draftOrder = await createDraftOrder(input);

      return { data: draftOrder, success: "Draft order successfully created" };
    } catch (error) {
      console.error(error);

      return { error };
    }
  }
};
