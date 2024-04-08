/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_STOREFRONT_API_ENDPOINT, TAGS } from "lib/constants";
import { domain } from "lib/shopify/constants";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from "lib/shopify/storefront/mutations/cart";
import { getCartQuery } from "lib/shopify/storefront/queries/cart";
import { getLocationsQuery } from "lib/shopify/storefront/queries/locations";
import { getPageQuery, getPagesQuery } from "lib/shopify/storefront/queries/page";
import { getProductQuery, getProductsQuery } from "lib/shopify/storefront/queries/product";
import { removeEdgesAndNodes, shopifyFetch } from "lib/shopify/utils";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import type {
  Cart,
  Connection,
  Image,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyLocation,
  ShopifyLocationsOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from "lib/shopify/storefront/types";
import type { ExtractVariables } from "lib/shopify/types";
import type { NextRequest } from "next/server";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_STOREFRONT_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const storefrontFetch = async <T>({
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
}) =>
  await shopifyFetch({
    cache,
    headers: { ...headers, "X-Shopify-Storefront-Access-Token": key },
    query,
    tags,
    variables,
    endpoint
  });

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD"
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await storefrontFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store"
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await storefrontFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: "no-store"
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeItems(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await storefrontFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: "no-store"
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const res = await storefrontFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: "no-store"
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await storefrontFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: "no-store"
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getPage(handle: string): Promise<Page> {
  const res = await storefrontFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await storefrontFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await storefrontFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await storefrontFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ["collections/create", "collections/delete", "collections/update"];
  const productWebhooks = ["products/create", "products/delete", "products/update"];
  const topic = headers().get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");

    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export async function getCompanyLocations({
  first
}: {
  first?: number;
}): Promise<ShopifyLocation[]> {
  const res = await storefrontFetch<ShopifyLocationsOperation>({
    query: getLocationsQuery,
    variables: {
      first
    },
    cache: "no-store"
  });

  return removeEdgesAndNodes(res.body.data.locations);
}
