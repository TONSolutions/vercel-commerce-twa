import type { Address, Connection, Image } from "lib/shopify/storefront/types";

type Product = {
  featuredImage: Image;
};

export type DraftOrderInput = {
  customAttributes?: CustomAttribute[];
  lineItems?: LineItem[];
  phone?: string;
  reserveInventoryUntil?: string;
  poNumber?: string;
};

export type LineItem = {
  quantity: number;
  variantId: string;
  title: string;
  variantTitle?: string;
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
  lineItems: Connection<LineItem>;
  poNumber: string;
};

export type DraftOrder = Omit<ShopifyDraftOrder, "lineItems"> & {
  lineItems: LineItem[];
};

export type ShopifyOrder = {
  id: string;
  name: string;
  tags: string[];
  lineItems: Connection<LineItem>;
  customAttributes: CustomAttribute[];
  subtotalLineItemsQuantity: number;
  displayFulfillmentStatus: string;
  createdAt: string;
  poNumber: string;
  fulfillments: Fulfillment[];
};

export type Order = Omit<ShopifyOrder, "lineItems"> & {
  lineItems: LineItem[];
};

type Fulfillment = {
  id: string;
  location: {
    address: Address;
  };
  status: string;
  displayStatus: string;
  updatedAt: string;
};

export type ShopifyGetOrdersOperation = {
  data: {
    orders: Connection<ShopifyOrder>;
  };
  variables: {
    queryString: string;
  };
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

export type ShopifyUpdateDraftOrderOperation = {
  data: {
    draftOrderUpdate: {
      draftOrder: ShopifyDraftOrder;
    };
  };
  variables: {
    input: DraftOrderInput;
    id: string;
  };
};

export type ShopifyCompleteDraftOrderOperation = {
  data: {
    draftOrderComplete: {
      draftOrder: {
        order: {
          name: string;
        };
      };
    };
  };
  variables: {
    id: string;
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
