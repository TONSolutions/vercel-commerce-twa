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

const fulfillmentsFragment = /* GraphQL */ `
  fragment fulfillmentsFragment on Fulfillment {
    id
    location {
      address {
        address1
        address2
        city
        country
        countryCode
        formatted
        latitude
        longitude
        province
        provinceCode
      }
    }
    status
    displayStatus
    updatedAt
  }
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
    poNumber
    fulfillments {
      ...fulfillmentsFragment
    }
  }
  ${orderLineItemFragment}
  ${fulfillmentsFragment}
`;
