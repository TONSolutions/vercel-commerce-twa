import imageFragment from "lib/shopify/storefront/fragments/image";

const draftOrderProductFragment = /* GraphQL */ `
  fragment product on Product {
    featuredImage {
      ...image
    }
  }
  ${imageFragment}
`;

const draftOrderLineItemFragment = /* GraphQL */ `
  fragment draftOrderLineItem on DraftOrderLineItem {
    id
    quantity
    title
    variantTitle
    originalTotal
    product {
      ...product
    }
  }
  ${draftOrderProductFragment}
`;

export const draftOrderFragment = /* GraphQL */ `
  fragment draftOrder on DraftOrder {
    id
    createdAt
    completedAt
    customAttributes {
      key
      value
    }
    lineItemsSubtotalPrice {
      shopMoney {
        amount
        currencyCode
      }
    }
    marketRegionCountryCode
    name
    reserveInventoryUntil
    status
    lineItems(first: 100) {
      edges {
        node {
          ...draftOrderLineItem
        }
      }
    }
  }
  ${draftOrderLineItemFragment}
`;
