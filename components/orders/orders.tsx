"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/common/ui/tabs";
import { getOrdersByAddress } from "components/orders/actions";
import { OrdersList } from "components/orders/components/OrdersList";
import { OrdersPageShimmer } from "components/orders/components/Shimmer/OrdersPageShimmer";
import { OrderType } from "components/orders/constants";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useEffect, useState, useTransition } from "react";

import type { MappedOrders } from "components/orders/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = {
  locations: ShopifyLocation[];
};

export const OrdersPage: FunctionComponent<Props> = ({ locations }) => {
  const [orders, setOrders] = useState<MappedOrders | null>(null);
  const { MainButton } = useWebAppDataConductor();
  const [isPending, startTransition] = useTransition();
  const address = useTonAddress();

  useEffect(() => {
    MainButton.hide();
  }, []);

  useEffect(() => {
    startTransition(() => {
      getOrdersByAddress(address).then(({ data, success, error }) => {
        if (success) {
          setOrders(data);
        }

        if (error) {
          //TODO handle
        }
      });
    });
  }, []);

  if (isPending || orders === null) {
    return <OrdersPageShimmer />;
  }

  return (
    <div className="mx-4 min-h-screen pt-6">
      <BackButton />

      <h1 className="mb-3 px-4 text-xl font-bold">My orders</h1>

      <Tabs defaultValue={OrderType.Active}>
        <TabsList className="grid w-full grid-cols-2 bg-[#74748014]">
          <TabsTrigger value={OrderType.Active}>Active</TabsTrigger>

          <TabsTrigger value={OrderType.Finished}>Finished</TabsTrigger>
        </TabsList>

        <TabsContent value={OrderType.Active}>
          <OrdersList
            type={OrderType.Active}
            orders={orders[OrderType.Active]}
            locations={locations}
          />
        </TabsContent>

        <TabsContent value={OrderType.Finished}>
          <OrdersList
            type={OrderType.Finished}
            orders={orders[OrderType.Finished]}
            locations={locations}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
