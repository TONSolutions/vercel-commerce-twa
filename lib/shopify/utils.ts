import { isShopifyError } from "lib/type-guards";

import type { Connection } from "lib/shopify/storefront/types";
import type { ExtractVariables } from "lib/shopify/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function shopifyFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
  endpoint
}: {
  cache?: any;
  headers?: any;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

export const removeEdgesAndNodes = (array: Connection<any>) =>
  array.edges.map((edge) => edge?.node);

export const generateBgColorClass = (colors: string[]) => {
  if (colors.length === 0) {
    return "bg-gradient-to-b from-transparent to-transparent";
  } else if (colors.length === 1) {
    return `bg-gradient-to-b from-${colors[0]} to-${colors[0]}`;
  } else {
    let gradient = "bg-gradient-to-b";

    colors.forEach((color, index) => {
      gradient += ` from-${color} ${(index / (colors.length - 1)) * 100}%`;
    });

    return gradient;
  }
};
