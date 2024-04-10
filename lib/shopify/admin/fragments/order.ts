import { draftOrderProductFragment } from "lib/shopify/admin/fragments/draft-order";

const orderLineItemFragment = /* GraphQL */ `
  fragment orderLineItem on LineItem {
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

export const orderFragment = /* GraphQL */ `
  fragment orderFragment on Order {
    id
    name
    tags
    lineItems(first: 100) {
      edges {
        node {
          ...orderLineItem
        }
      }
    }
    customAttributes {
      key
      value
    }
    subtotalLineItemsQuantity
    displayFulfillmentStatus
    createdAt
    updatedAt
    poNumber
    currentSubtotalPriceSet {
      shopMoney {
        amount
      }
    }
  }
  ${orderLineItemFragment}
`;
