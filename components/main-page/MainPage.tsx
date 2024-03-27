"use client";

import { Card } from "components/ui/Card";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import Link from "next/link";

import type { Product } from "lib/shopify/types";
import type { FunctionComponent } from "react";

type Props = {
  products: Product[];
};

export const MainPage: FunctionComponent<Props> = ({ products }) => {
  const {
    initDataUnsafe: { user }
  } = useWebAppDataConductor();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <h1 className="p-4">{`Hello ${user?.username ?? "User"}! This page is WIP. Just preview`}</h1>
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
