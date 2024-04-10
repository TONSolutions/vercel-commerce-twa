"use server";

import { OrderType } from "components/orders/constants";
import { getOrders } from "lib/shopify/admin";
import { updateOrder as updateOrderWorker } from "lib/shopify/admin/index";

import type { MappedOrders } from "components/orders/types";
import type { OrderInput } from "lib/shopify/admin/types";

export const getOrdersByAddress = async (address: string) => {
  if (!address) {
    throw new Error("No address provided");
  }

  try {
    const orders = await getOrders(address);

    const mappedOrders = orders.reduce<MappedOrders>(
      (acc, curr) => {
        if (curr.displayFulfillmentStatus === "UNFULFILLED") {
          return { ...acc, [OrderType.Active]: [...acc[OrderType.Active], curr] };
        }

        return { ...acc, [OrderType.Finished]: [...acc[OrderType.Finished], curr] };
      },
      {
        [OrderType.Active]: [],
        [OrderType.Finished]: []
      }
    );

    return { data: mappedOrders, success: "Orders successfully fetched" };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

export const updateOrder = async (input: OrderInput) => {
  try {
    const updatedDraftOrder = await updateOrderWorker(input);

    return { data: updatedDraftOrder, success: "Draft order successfully fetched" };
  } catch (error) {
    console.error(error);

    return { error };
  }
};
