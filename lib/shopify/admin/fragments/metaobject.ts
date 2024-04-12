import imageFragment from "lib/shopify/storefront/fragments/image";

export const metaobjectFragment = /* GraphQL */ `
  fragment metaobject on Metaobject {
    fields {
      key
      value
    }
    thumbnailField {
      reference {
        ... on MediaImage {
          image {
            ...image
          }
        }
      }
    }
  }
  ${imageFragment}
`;
