/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT } from "lib/constants";
import { createDraftOrderMutation } from "lib/shopify/admin/mutations/draft-order";
import { getDraftOrderQuery } from "lib/shopify/admin/queries/draft-order";
import { domain } from "lib/shopify/constants";
import { removeEdgesAndNodes, shopifyFetch } from "lib/shopify/utils";


import type {
  DraftOrder,
  DraftOrderInput,
  ShopifyCreateDraftOrderOperation,
  ShopifyDraftOrder,
  ShopifyGetDraftOrderOperation
} from "lib/shopify/admin/types";
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

export async function getDraftOrderById(draftOrderId: string): Promise<DraftOrder> {
  const res = await adminFetch<ShopifyGetDraftOrderOperation>({
    query: getDraftOrderQuery,
    variables: {
      id: draftOrderId,
    },
    cache: "no-store"
  });

  return reshapeDraftOrder(res.body.data.draftOrder);
}