/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT } from "lib/constants";
import { createDraftOrderMutation } from "lib/shopify/admin/mutations/draft-order";
import { domain } from "lib/shopify/constants";
import { shopifyFetch } from "lib/shopify/utils";

import type {
  DraftOrder,
  DraftOrderInput,
  ShopifyCreateDraftOrderOperation
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


export async function createDraftOrder(input: DraftOrderInput): Promise<DraftOrder> {
  const res = await adminFetch<ShopifyCreateDraftOrderOperation>({
    query: createDraftOrderMutation,
    variables: {
      input
    },
    cache: "no-store"
  });

  return res.body.data.draftOrderCreate.draftOrder;
}
