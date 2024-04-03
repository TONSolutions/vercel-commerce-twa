import imageFragment from "lib/shopify/storefront/fragments/image";

const draftOrderProductFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    tags
    updatedAt
  }
  ${imageFragment}
`;

const draftOrderLineItemFragment = /* GraphQL */ `
  fragment draftOrderLineItem on DraftOrderLineItem {
    id
    quantity
    name
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
