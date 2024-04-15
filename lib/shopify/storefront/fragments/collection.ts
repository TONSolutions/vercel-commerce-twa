import productFragment from "lib/shopify/storefront/fragments/product";

export const collectionFragment = /* GraphQL*/ `
fragment collection on Collection {
  id
  title
  products(first: 250) {
  edges {
  node {
  ...product
  }
  }
}
}
${productFragment}
`;
