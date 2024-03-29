import { createDataConductor } from "lib/createDataConductor";

import type { Cart, Line } from "lib/shopify/types";

type CartConductorProvider = {
  cart: Cart;
  handleUpdateQuantity: (line: Line) => void;
  handleClearCart: () => void;
  loading: boolean;
};

const { DataConductorProvider: CartDataConductorProvider, useDataConductor: useCartDataConductor } =
  createDataConductor<CartConductorProvider>({
    displayName: "CartDataConductor"
  });

export { CartDataConductorProvider, useCartDataConductor };
