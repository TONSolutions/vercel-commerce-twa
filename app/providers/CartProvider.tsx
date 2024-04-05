/* eslint-disable prettier/prettier */
import { clearCart, updateItemQuantity } from "components/cart/actions";
import { Routes } from "components/constants";
import { CartDataConductorProvider } from "contexts/CartContext";
import { request } from "lib/request";
import { getValueFromTelegramCloudStorage, prepareCartIdForUrl } from "lib/utils";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  useTransition,
  type FunctionComponent,
  type ReactNode
} from "react";

import type { Cart, Line } from "lib/shopify/storefront/types";

type Props = {
  children: ReactNode;
};

export const CartProvider: FunctionComponent<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = (await getValueFromTelegramCloudStorage("cartId")) as string;

      if (cartId) {
          setCartId(prepareCartIdForUrl(cartId));

          try {
              const cart = await request<Cart>("/api/cart", { body: { cartId } });
              setCart(cart);
          } catch (e) {
              console.error(e);
          }
      }
    };

    fetchCart();
  }, []);

  const handleClearCart = () => {
    if (cart) {
      startTransition(() => {
        const itemIds = cart.lines.map(({ id }) => id);

        clearCart(cart.id, itemIds).then(({ data, success, error }) => {
          if (success) {
            setCart(data);
            router.push(Routes.Main);
          }

          if (error) {
            //TODO error handling
          }
        });
      });
    }
  };

  const handleUpdateQuantity = (line: Line) => {
    if (cart) {
      startTransition(() => {
        updateItemQuantity(cart.id, line).then(({ data, success, error }) => {
          if (success) {
            setCart(data);
          }

          if (error) {
            //TODO error handling
          }
        });
      });
    }
  };

  const cartDataConductorCtx = useMemo(
    () => ({
      cart,
      setCart,
      handleUpdateQuantity,
      handleClearCart,
      loading: isPending,
      total: cart?.cost?.subtotalAmount?.amount,
      cartId,
      itemsQuantity: cart?.totalQuantity
    }),
    [cart, handleClearCart, handleUpdateQuantity, isPending]
  );

  if (!cart) {
    return null;
  }

  return (
    <CartDataConductorProvider value={cartDataConductorCtx}>{children}</CartDataConductorProvider>
  );
};
