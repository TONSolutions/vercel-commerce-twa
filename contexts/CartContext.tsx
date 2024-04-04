import { createDataConductor } from "lib/createDataConductor";

import type { Cart, Line } from "lib/shopify/storefront/types";

type CartConductorProvider = {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  handleUpdateQuantity: (line: Line) => void;
  handleClearCart: () => void;
  loading: boolean;
  total?: string;
  itemsQuantity?: number;
  cartId: string | null;
};

const { DataConductorProvider: CartDataConductorProvider, useDataConductor: useCartDataConductor } =
  createDataConductor<CartConductorProvider>({
    displayName: "CartDataConductor"
  });

export { CartDataConductorProvider, useCartDataConductor };
