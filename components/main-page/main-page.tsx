"use client";

import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useTonWallet
} from "@tonconnect/ui-react";
import CartIcon from "components/assets/icons/CartIcon";
import StoreLogo from "components/assets/StoreLogo";
import { OverlayCard } from "components/common/ui/Card";
import { TabsContent, TabsList, Tabs, TabsTrigger } from "components/common/ui/tabs";
import { Routes } from "components/constants";
import { BannersContainer } from "components/main-page/components/BannersContainer";
import { MainPageProductItem } from "components/main-page/components/MainPageProductItem";
import { MenuButton } from "components/main-page/components/MenuButton";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import data from "data/tonRates.json";
import { Button } from "konsta/react";
import { redirectToWallet } from "lib/redirectToWallet";
import { useRouter } from "next/navigation";
import { useEffect, type FunctionComponent } from "react";

import type { WalletInfoRemote } from "@tonconnect/ui-react";
import type { Banner } from "components/main-page/types";
import type { Collection } from "lib/shopify/storefront/types";

type Props = {
  banners: Banner[];
  collections: Collection[];
};

export const MainPage: FunctionComponent<Props> = ({ banners, collections }) => {
  const { MainButton, expand } = useWebAppDataConductor();

  const { itemsQuantity } = useCartDataConductor();
  const [tonConnect] = useTonConnectUI();
  const router = useRouter();

  const cartLink = itemsQuantity && itemsQuantity > 0 ? `/cart/items` : "/cart";
  const wallet = useTonWallet();
  const address = useTonAddress();
  const tonUsdPrice = data.usd;

  const handleDisconnectWallet = () => {
    if (!tonConnect) {
      console.error("No ton connect found");

      return;
    }

    tonConnect.disconnect();
  };

  const handleAddBalanceCLick = () => {
    if (!tonConnect) {
      console.error("No ton connect found");

      return;
    }

    const { universalLink, deepLink } = tonConnect.wallet as WalletInfoRemote;

    redirectToWallet(universalLink, deepLink, { returnStrategy: "back", forceRedirect: false });
  };

  const handleMoveToOrders = () => router.push(Routes.Orders);

  useEffect(() => {
    MainButton.hide();
    expand();
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="mx-4 mt-4 flex items-center justify-between">
        <StoreLogo />

        <div className="flex items-center">
          {wallet ? (
            <MenuButton
              address={address}
              handleAddBalanceCLick={handleAddBalanceCLick}
              handleDisconnectWallet={handleDisconnectWallet}
              handleMoveToOrders={handleMoveToOrders}
            />
          ) : (
            <TonConnectButton className="mr-4" />
          )}

          <Button className="!h-10 !w-10 !rounded-full !bg-bg_color !p-2" href={cartLink}>
            <CartIcon />
          </Button>
        </div>
      </div>

      <BannersContainer banners={banners} />

      <OverlayCard>
        <h2 className="mb-1 px-4 text-xl font-bold">Product catalog</h2>

        <Tabs defaultValue={collections[0].title}>
          <div className="relative hairline-b">
            <div className="w-full overflow-x-scroll pl-4  no-scrollbar">
              <TabsList className="gap-2">
                {collections.map(({ title }, index) => (
                  <TabsTrigger value={title} key={index} variant="outlined">
                    {title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {collections.map(({ title, products }, index) => (
            <TabsContent key={index} value={title} className="!mt-0">
              <div className="grid grid-cols-2 gap-2 p-4">
                {products.map(({ title, handle, images, priceRange }, index) => (
                  <MainPageProductItem
                    key={index}
                    title={title}
                    handle={handle}
                    images={images}
                    price={priceRange.minVariantPrice.amount}
                    usdPrice={(
                      Number(priceRange.minVariantPrice.amount) * Number(tonUsdPrice)
                    ).toFixed(2)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </OverlayCard>
    </div>
  );
};
