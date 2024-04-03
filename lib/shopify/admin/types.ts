import type { CartItem, Connection } from "lib/shopify/storefront/types";

export type DraftOrderInput = {
  customAttributes?: CustomAttribute[];
  lineItems?: DraftOrderLineItem[];
  phone?: string;
  reserveInventoryUntil?: string;
};

type DraftOrderLineItem = {
  quantity: number;
  variantId: string;
  title: string;
};

type CustomAttribute = {
  key: string;
  value: string;
};

type VariantPrice = {
  amount: string;
  currencyCode: string;
};

export type DraftOrder = {
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
  lineItems: Connection<CartItem>;
};

export type ShopifyCreateDraftOrderOperation = {
  data: {
    draftOrderCreate: {
      draftOrder: DraftOrder;
    };
  };
  variables: {
    input: DraftOrderInput;
  };
};
