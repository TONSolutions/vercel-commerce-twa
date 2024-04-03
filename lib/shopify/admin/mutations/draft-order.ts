import { draftOrderFragment } from "lib/shopify/admin/fragments/draft-order";

export const createDraftOrderMutation = /* GraphQL */ `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        ...draftOrder
      }
      userErrors {
        field
        message
      }
    }
  }
  ${draftOrderFragment}
`;
