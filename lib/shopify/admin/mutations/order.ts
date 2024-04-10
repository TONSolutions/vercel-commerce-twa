import { orderFragment } from "lib/shopify/admin/fragments/order";

export const updateOrderMutation = /* GraphQL */ `
  mutation orderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      order {
        ...orderFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${orderFragment}
`;
