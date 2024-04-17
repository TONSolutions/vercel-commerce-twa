"use server";

import { TAGS } from "lib/constants";
import { createDraftOrder, getDraftOrder, updateDraftOrder } from "lib/shopify/admin";
import { addToCart, createCart, removeItems, updateCart } from "lib/shopify/storefront";
import { isReserveValid } from "lib/utils";
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
    const draftOrder = await getDraftOrder(draftOrderId);

    const { reserveInventoryUntil, customAttributes } = draftOrder;
    const { lineItems: newLineItems, poNumber } = input;

    if (isReserveValid(reserveInventoryUntil)) {
      //Update draft order content – just in case if user added new goods in cart
      const newInput: DraftOrderInput = {
        ...input,
        lineItems: newLineItems,
        poNumber,
        reserveInventoryUntil
      };

      const updatedDraftOrder = await updateDraftOrder(draftOrderId, newInput);

      return { data: updatedDraftOrder, success: "Draft order successfully created" };
    } else {
      //Reservation is over. If item is out of stock, Shopify send quantity === 0. So we need to remove'em from the cart.
      const filteredNewLineItems = newLineItems?.filter(({ quantity }) => quantity > 0);
      const updatedCustomAttributes = [...customAttributes, { key: "wasFiltered", value: "true" }];

      const newInput: DraftOrderInput = {
        ...input,
        poNumber,
        lineItems: filteredNewLineItems,
        customAttributes: updatedCustomAttributes
      };

      const updatedDraftOrder = await updateDraftOrder(draftOrderId, newInput);

      return {
        data: updatedDraftOrder,
        success: "Unfortunately, some items are out of stock. We have removed them from your cart."
      };
    }
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
