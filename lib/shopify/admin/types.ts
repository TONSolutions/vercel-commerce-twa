import type { Connection, Image } from "lib/shopify/storefront/types";

type Product = {
  featuredImage: Image;
};

export type DraftOrderInput = {
  customAttributes?: CustomAttribute[];
  lineItems?: DraftOrderLineItem[];
  phone?: string;
  reserveInventoryUntil?: string;
};

export type DraftOrderLineItem = {
  quantity: number;
  variantId: string;
  name: string;
  originalTotal?: string;
  product?: Product;
};

type CustomAttribute = {
  key: string;
  value: string;
};

type VariantPrice = {
  amount: string;
  currencyCode: string;
};

export type ShopifyDraftOrder = {
  id: string;
  createdAt: string;
  completedAt: string;
  customAttributes: CustomAttribute[];
  lineItemsSubtotalPrice: {
    shopMoney: VariantPrice;
  };
  marketRegionCountryCode: string;
  name: string;
  reserveInventoryUntil: string;
  status: string;
  lineItems: Connection<DraftOrderLineItem>;
};

export type DraftOrder = Omit<ShopifyDraftOrder, "lineItems"> & {
  lineItems: DraftOrderLineItem[];
};

export type ShopifyCreateDraftOrderOperation = {
  data: {
    draftOrderCreate: {
      draftOrder: ShopifyDraftOrder;
    };
  };
  variables: {
    input: DraftOrderInput;
  };
};

export type ShopifyGetDraftOrderOperation = {
  data: {
    draftOrder: ShopifyDraftOrder;
  };
  variables: {
    id: string;
  };
};
