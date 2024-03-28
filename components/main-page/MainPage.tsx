"use client";

import { Card } from "components/ui/Card";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { getValueFromTelegramCloudStorage, prepareCartIdForUrl } from "lib/utils";
import Link from "next/link";
import { useEffect, useState, type FunctionComponent } from "react";

import type { Product } from "lib/shopify/types";

type Props = {
  products: Product[];
};

export const MainPage: FunctionComponent<Props> = ({ products }) => {
  const [cartId, setCartId] = useState<null | string>(null);
  const {
    initDataUnsafe: { user },
    MainButton
  } = useWebAppDataConductor();

  const cartLink = cartId ? `cart${cartId}` : "/cart";

  useEffect(() => {
    //TODO transition;
    const handleCartId = async () => {
      const cartId = (await getValueFromTelegramCloudStorage("cartId")) as string;

      if (cartId) {
        setCartId(prepareCartIdForUrl(cartId));
      }
    };

    handleCartId();
  }, []);

  useEffect(() => {
    MainButton.hide();
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <h1 className="p-4">{`Hello ${user?.username ?? "User"}! This page is WIP. Just preview`}</h1>

        <Link href={cartLink}>
          <span className="ml-4 mt-2 rounded-xl bg-[#007AFF] px-4 py-2 text-white">Cart</span>
        </Link>
      </div>

      <Card>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          {products.map((product, index) => (
            <Link key={index} href={`/${product.handle}`}>
              <div className="min-h-[279px] rounded-xl border">
                <img src={product.images[0].url} />

                <p className="px-2 py-4">{product.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};
