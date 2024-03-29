"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { clearCart, updateItemQuantity } from "components/cart/actions";
import { CartList } from "components/cart/components/CartList";
import { CartTitleSection } from "components/cart/components/CartTitleSection";
import { CartDataConductorProvider } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useEffect, useMemo, useState, useTransition, type FunctionComponent } from "react";

import type { Cart, Line } from "lib/shopify/types";

type Props = {
  cart: Cart;
};
//gid://shopify/Cart/c1-f1feed27b05066ff619afbcadf8be935
export const CartPage: FunctionComponent<Props> = ({ cart }) => {
  const [userCart, setUserCart] = useState<Cart>(cart);
  const [isPending, startTransition] = useTransition();
  const { MainButton } = useWebAppDataConductor();
  const {
    cost: {
      subtotalAmount: { amount }
    }
  } = cart;

  const handleClearCart = () => {
    startTransition(() => {
      const itemIds = userCart.lines.map(({ id }) => id);

      clearCart(cart.id, itemIds).then(({ data, success, error }) => {
        if (success) {
          setUserCart(data);
        }

        if (error) {
          //TODO error handling
        }
      });
    });
  };

  const handleUpdateQuantity = (line: Line) => {
    startTransition(() => {
      updateItemQuantity(cart.id, line).then(({ data, success, error }) => {
        if (success) {
          setUserCart(data);
        }

        if (error) {
          //TODO error handling
        }
      });
    });
  };

  useEffect(() => {
    MainButton.show();
    MainButton.setText(`Pay ${amount} TON`);
  }, [amount]);

  const cartDataConductorCtx = useMemo(
    () => ({
      cart: userCart,
      handleUpdateQuantity,
      handleClearCart,
      loading: isPending
    }),
    [cart, handleClearCart, handleUpdateQuantity, isPending]
  );

  return (
    <CartDataConductorProvider value={cartDataConductorCtx}>
      <div className="min-h-screen bg-bg_color px-4 py-6">
        <div className="flex flex-col gap-4">
          <BackButton />

          <CartTitleSection />

          <CartList />
        </div>
      </div>
    </CartDataConductorProvider>
  );
};
