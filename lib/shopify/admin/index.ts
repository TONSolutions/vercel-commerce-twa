/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT } from "lib/constants";
import { completeDraftOrderMutation, createDraftOrderMutation, updateDraftOrderMutation } from "lib/shopify/admin/mutations/draft-order";
import { updateOrderMutation } from "lib/shopify/admin/mutations/order";
import { getDraftOrderQuery } from "lib/shopify/admin/queries/draft-order";
import { getMetaobjectsQuery } from "lib/shopify/admin/queries/metaobject";
import { getOrderQuery, getOrdersByAddressQuery } from "lib/shopify/admin/queries/order";
import { domain } from "lib/shopify/constants";
import { removeEdgesAndNodes, shopifyFetch } from "lib/shopify/utils";

import type {
  DraftOrder,
  DraftOrderInput,
  Metaobject,
  Order,
  OrderInput,
  ShopifyCompleteDraftOrderOperation,
  ShopifyCreateDraftOrderOperation,
  ShopifyDraftOrder,
  ShopifyGetDraftOrderOperation,
  ShopifyGetMetaobjectsOperation,
  ShopifyGetOrderOperation,
  ShopifyGetOrdersOperation,
  ShopifyOrder,
  ShopifyUpdateDraftOrderOperation,
  ShopifyUpdateOrderOperation
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


const reshapeDraftOrder = (draftOrder: ShopifyDraftOrder): DraftOrder => ({...draftOrder, lineItems: removeEdgesAndNodes(draftOrder.lineItems)});
const reshapeOrders = (orders:  Connection<ShopifyOrder>): Order[] => removeEdgesAndNodes(orders).map((item) => ({...item, lineItems: removeEdgesAndNodes(item.lineItems)}) );
const reshapeOrder = (order: ShopifyOrder): Order => ({ ...order, lineItems: removeEdgesAndNodes(order.lineItems) })


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

  return reshapeOrders(res.body.data.orders);
}

export async function getOrder(id: string): Promise<Order> {
  const res = await adminFetch<ShopifyGetOrderOperation>({
    query: getOrderQuery,
    variables: {
      id,
    },
    cache: "no-store"
  });

  return reshapeOrder(res.body.data.order);
}

export async function updateOrder(input: OrderInput): Promise<Order> {
  const res = await adminFetch<ShopifyUpdateOrderOperation>({
    query: updateOrderMutation,
    variables: {
      input,
    },
    cache: "no-store"
  });

  return reshapeOrder(res.body.data.orderUpdate.order);
}

export async function getMetaobjects(type: string, first: number): Promise<Metaobject[]> {
  const res = await adminFetch<ShopifyGetMetaobjectsOperation>({
    query: getMetaobjectsQuery,
    variables: {
      type, 
      first
    },
    cache: "no-store"
  });

  return removeEdgesAndNodes(res.body.data.metaobjects);
}