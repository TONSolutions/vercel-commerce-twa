import { metaobjectFragment } from "lib/shopify/admin/fragments/metaobject";

export const getMetaobjectsQuery = /* GraphQL */ `
  query ($type: String!, $first: Int) {
    metaobjects(first: $first, type: $type) {
      edges {
        node {
          ...metaobject
        }
      }
    }
  }
  ${metaobjectFragment}
`;
