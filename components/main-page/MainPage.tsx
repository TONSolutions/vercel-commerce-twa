import { Card } from "components/ui/Card";
import Link from "next/link";

import type { Product } from "lib/shopify/types";
import type { FunctionComponent } from "react";

type Props = {
  products: Product[];
};

export const MainPage: FunctionComponent<Props> = ({ products }) => (
  <>
    <h1>This page is WIP. Just preview</h1>

    <Card className="h-[70vh]">
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
  </>
);
