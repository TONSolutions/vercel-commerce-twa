"use server";

import { getOrders } from "lib/shopify/admin";

export const getOrdersByAddress = async (address: string) => {
  if (!address) {
    throw new Error("No address provided");
  }

  try {
    const orders = await getOrders(address);

    return { data: orders, success: "Orders successfully fetched" };
  } catch (error) {
    console.error(error);

    return { error };
  }
};
