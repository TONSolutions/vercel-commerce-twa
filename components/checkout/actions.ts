"use server";

import { completeDraftOrder } from "lib/shopify/admin";

export const markOrderAsPaid = async (id: string) => {
  if (!id) {
    throw new Error("No Draft order ID provided");
  }

  try {
    const orderName = await completeDraftOrder(id);

    return { data: orderName, success: "Draft order successfully converted to order " };
  } catch (error) {
    console.error(error);

    return { error };
  }
};
