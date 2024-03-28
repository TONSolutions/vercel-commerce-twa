"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { CartItem } from "components/cart/components/CartItem";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useEffect, type FunctionComponent } from "react";

import type { Cart } from "lib/shopify/types";

type Props = {
  cart: Cart;
};
//gid://shopify/Cart/c1-f1feed27b05066ff619afbcadf8be935
export const CartPage: FunctionComponent<Props> = ({ cart }) => {
  const { MainButton } = useWebAppDataConductor();
  const {
    cost: {
      subtotalAmount: { amount }
    },
    totalQuantity,
    lines
  } = cart;

  // const handleClearCart = () => {
  //   console.log("triggered");
  // };

  useEffect(() => {
    MainButton.show();
    MainButton.setText(`Pay ${amount} TON`);
  }, []);

  //TODO add clear all functionality

  return (
    <div className="min-h-screen bg-bg_color px-4 py-6">
      <div className="flex flex-col gap-4">
        <BackButton />

        <div className="flex w-full justify-between">
          <div className="flex">
            <h1 className="mr-2 font-bold">Your cart</h1>

            <span className="text-hint_color">{`${totalQuantity} items`}</span>
          </div>

          {/* <Link className="text-link_color" onClick={handleClearCart}>
            Clear all
          </Link> */}
        </div>

        <div className="flex flex-col gap-4">
          {lines.map(({ quantity, merchandise, cost }, index) => {
            const {
              totalAmount: { amount: price }
            } = cost;

            const {
              title: sizeColorTitle,
              product: {
                title,
                featuredImage: { url }
              }
            } = merchandise;

            const options = sizeColorTitle.replace("/", String.fromCharCode(183));

            return (
              <CartItem
                key={index}
                quantity={quantity}
                options={options}
                price={price}
                title={title}
                imageUrl={url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
