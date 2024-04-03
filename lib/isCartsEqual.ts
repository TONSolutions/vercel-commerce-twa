import type { DraftOrderLineItem } from "lib/shopify/admin/types";

export const isCartsEqual = (
  localCart: DraftOrderLineItem[] = [],
  draftOrderCart: DraftOrderLineItem[] = []
) => {
  if (localCart.length !== draftOrderCart.length) {
    return false;
  }

  localCart.sort((a, b) => a.variantId.localeCompare(b.variantId));
  draftOrderCart.sort((a, b) => a.variantId.localeCompare(b.variantId));

  for (let i = 0; i < localCart.length; i++) {
    if (
      localCart[i].variantId !== draftOrderCart[i].variantId ||
      localCart[i].quantity !== draftOrderCart[i].quantity ||
      localCart[i].name !== draftOrderCart[i].name
    ) {
      return false;
    }
  }

  return true;
};
