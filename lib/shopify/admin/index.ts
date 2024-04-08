/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT } from "lib/constants";
import { completeDraftOrderMutation, createDraftOrderMutation, updateDraftOrderMutation } from "lib/shopify/admin/mutations/draft-order";
import { getDraftOrderQuery } from "lib/shopify/admin/queries/draft-order";
import { getOrdersByAddressQuery } from "lib/shopify/admin/queries/order";
import { domain } from "lib/shopify/constants";
import { removeEdgesAndNodes, shopifyFetch } from "lib/shopify/utils";



import type {
  DraftOrder,
  DraftOrderInput,
  Order,
  ShopifyCompleteDraftOrderOperation,
  ShopifyCreateDraftOrderOperation,
  ShopifyDraftOrder,
  ShopifyGetDraftOrderOperation,
  ShopifyGetOrdersOperation,
  ShopifyOrder,
  ShopifyUpdateDraftOrderOperation
} from "lib/shopify/admin/types";
import type { Connection } from "lib/shopify/storefront/types";
import type { ExtractVariables } from "lib/shopify/types";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT}`;
const key = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

const adminFetch = async <T>({
  cache,
  query,
  headers,
  tags,
  variables
}: {
  cache?: any;
  headers?: any;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  }) => await shopifyFetch({ cache, headers: { ...headers, "X-Shopify-Access-Token": key }, query, tags, variables, endpoint });


const reshapeDraftOrder = (draftOrder: ShopifyDraftOrder): DraftOrder => ({...draftOrder, lineItems: removeEdgesAndNodes(draftOrder.lineItems)})
const reshapeOrder = (orders:  Connection<ShopifyOrder>): Order[] => removeEdgesAndNodes(orders).map((item) => ({...item, lineItems: removeEdgesAndNodes(item.lineItems)}) );

export async function createDraftOrder(input: DraftOrderInput): Promise<DraftOrder> {
  const res = await adminFetch<ShopifyCreateDraftOrderOperation>({
    query: createDraftOrderMutation,
    variables: {
      input
    },
    cache: "no-store"
  });

  return reshapeDraftOrder(res.body.data.draftOrderCreate.draftOrder);
}

export async function updateDraftOrder(id: string, input: DraftOrderInput): Promise<DraftOrder> {
  const res = await adminFetch<ShopifyUpdateDraftOrderOperation>({
    query: updateDraftOrderMutation,
    variables: {
      input,
      id
    },
    cache: "no-store"
  });

  return reshapeDraftOrder(res.body.data.draftOrderUpdate.draftOrder);
}

export async function completeDraftOrder(id: string): Promise<string> {
  const res = await adminFetch<ShopifyCompleteDraftOrderOperation>({
    query: completeDraftOrderMutation,
    variables: {
      id
    },
    cache: "no-store"
  });

  return res.body.data.draftOrderComplete.draftOrder.order.name;
}

export async function getDraftOrder(id: string): Promise<DraftOrder> {
  const res = await adminFetch<ShopifyGetDraftOrderOperation>({
    query: getDraftOrderQuery,
    variables: {
      id
    },
    cache: "no-store"
  });

  return reshapeDraftOrder(res.body.data.draftOrder);
}

export async function getOrders(addressId: string): Promise<Order[]> {
  const res = await adminFetch<ShopifyGetOrdersOperation>({
    query: getOrdersByAddressQuery,
    variables: {
      queryString: `po_number:${addressId}`
    },
    cache: "no-store"
  });

  return reshapeOrder(res.body.data.orders);
}

