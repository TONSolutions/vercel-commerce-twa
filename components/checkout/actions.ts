"use server";

import {
  completeDraftOrder,
  getDraftOrder,
  updateDraftOrder as updateDraftOrderWorker
} from "lib/shopify/admin";

import type { DraftOrderInput } from "lib/shopify/admin/types";

export const markOrderAsPaid = async (draftOrderId: string) => {
  if (!draftOrderId) {
    throw new Error("No Draft order ID provided");
  }

  try {
    const orderName = await completeDraftOrder(draftOrderId);

    return { data: orderName, success: "Draft order successfully converted to order " };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

export const getDraftOrderById = async (draftOrderId: string) => {
  if (!draftOrderId) {
    throw new Error("No Draft order ID provided");
  }

  try {
    const draftOrder = await getDraftOrder(draftOrderId);

    return { data: draftOrder, success: "Draft order successfully fetched" };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

export const updateDraftOrder = async (input: DraftOrderInput, draftOrderId: string) => {
  if (!draftOrderId) {
    throw new Error("No Draft order ID provided");
  }

  try {
    const updatedDraftOrder = await updateDraftOrderWorker(draftOrderId, input);

    return { data: updatedDraftOrder, success: "Draft order successfully fetched" };
  } catch (error) {
    console.error(error);

    return { error };
  }
};
