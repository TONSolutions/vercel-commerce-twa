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
import { Routes } from "components/constants";
import { useGetUserBalance } from "components/hooks/useGetUserBalance";
import { BannersContainer } from "components/main-page/components/BannersContainer";
import { MenuButton } from "components/main-page/components/MenuButton";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { Button } from "konsta/react";
import { redirectToWallet } from "lib/redirectToWallet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type FunctionComponent } from "react";

import type { WalletInfoRemote } from "@tonconnect/ui-react";
import type { Banner } from "components/main-page/types";
import type { Product } from "lib/shopify/storefront/types";

type Props = {
  products: Product[];
  banners: Banner[];
};

export const MainPage: FunctionComponent<Props> = ({ products, banners }) => {
  const { MainButton, expand } = useWebAppDataConductor();

  const { itemsQuantity } = useCartDataConductor();
  const [tonConnect] = useTonConnectUI();
  const router = useRouter();

  const cartLink = itemsQuantity && itemsQuantity > 0 ? `/cart/items` : "/cart";
  const wallet = useTonWallet();
  const address = useTonAddress();

  const balance = useGetUserBalance({ address });

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
              balance={balance}
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
