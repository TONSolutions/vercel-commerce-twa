"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { getOrdersByAddress } from "components/orders/actions";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useEffect, useState, useTransition } from "react";

import type { Order } from "lib/shopify/admin/types";

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
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

  if (isPending || !orders) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="pt-6">
      <BackButton />

      <h1 className="mb-3 px-4 text-xl font-bold">My orders</h1>
    </div>
  );
};
