import { draftOrderFragment } from "lib/shopify/admin/fragments/draft-order";

export const getDraftOrderQuery = /* GraphQL */ `
  query draftOrder($id: ID!) {
    draftOrder(id: $id) {
      ...draftOrder
    }
  }
  ${draftOrderFragment}
`;
