"use client";

import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { OverlayCard } from "components/common/ui/Card";
import { Routes } from "components/constants";
import { BannersContainer } from "components/main-page/components/BannersContainer";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import Link from "next/link";
import { useEffect, type FunctionComponent } from "react";

import type { Banner } from "components/main-page/types";
import type { Product } from "lib/shopify/storefront/types";

type Props = {
  products: Product[];
  banners: Banner[];
};

//TODO style dropdown button when wallet is connected;

export const MainPage: FunctionComponent<Props> = ({ products, banners }) => {
  const {
    initDataUnsafe: { user },
    MainButton,
    expand
  } = useWebAppDataConductor();

  const { itemsQuantity } = useCartDataConductor();

  const cartLink = itemsQuantity && itemsQuantity > 0 ? `/cart/items` : "/cart";
  const wallet = useTonWallet();
  const address = useTonAddress();

  useEffect(() => {
    MainButton.hide();
    expand();
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="px-4">{`Hello ${user?.username ?? "User"}! This page is WIP. Just preview`}</h1>

        {wallet ? (
          <p className="px-4 text-xs">{`You've connected wallet. The current address is: ${address}`}</p>
        ) : null}

        <Link href={cartLink}>
          <span className="ml-4 mt-2 rounded-xl bg-[#007AFF] px-4 py-2 text-white">Cart</span>
        </Link>

        <Link href={Routes.Orders}>
          <span className="ml-4 mt-2 rounded-xl bg-[#007AFF] px-4 py-2 text-white">Orders</span>
        </Link>

        <TonConnectButton className="mt-5 self-end" />
      </div>

      <BannersContainer banners={banners} />

      <OverlayCard>
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
      </OverlayCard>
    </div>
  );
};
