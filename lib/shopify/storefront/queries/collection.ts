import { collectionFragment } from "lib/shopify/storefront/fragments/collection";

export const getCollectionsQuery = /* GraphQL */ `
  query ($first: Int) {
    collections(first: $first) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;
