import { orderFragment } from "lib/shopify/admin/fragments/order";

export const getOrdersByAddressQuery = /* GraphQL */ `
  query ($queryString: String) {
    orders(first: 50, query: $queryString) {
      edges {
        node {
          ...orderFragment
        }
      }
    }
  }
  ${orderFragment}
`;

export const getOrderQuery = /* GraphQL */ `
  query order($id: ID!) {
    order(id: $id) {
      ...orderFragment
    }
  }
  ${orderFragment}
`;
