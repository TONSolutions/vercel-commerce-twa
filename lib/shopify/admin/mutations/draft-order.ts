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

export const updateDraftOrderMutation = /* GraphQL */ `
  mutation draftOrderUpdate($id: ID!, $input: DraftOrderInput!) {
    draftOrderUpdate(id: $id, input: $input) {
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

export const completeDraftOrderMutation = /* GraphQL */ `
  mutation draftOrderComplete($id: ID!) {
    draftOrderComplete(id: $id) {
      draftOrder {
        order {
          name
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
