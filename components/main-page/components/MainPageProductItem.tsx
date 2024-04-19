import { ImagesCarousel } from "components/main-page/components/ImagesCarousel";
import { CardPriceBlock } from "components/product/components/CardPriceBlock";
import Link from "next/link";

import type { Money, Product } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = {
  handle: Product["handle"];
  images: Product["images"];
  title: Product["title"];
  price: Money["amount"];
  usdPrice: string;
};

export const MainPageProductItem: FunctionComponent<Props> = ({
  handle,
  images,
  title,
  price,
  usdPrice
}) => (
  <Link href={`/${handle}`}>
    <div className="flex flex-col justify-between gap-3">
      <ImagesCarousel images={images} />

      <div>
        <CardPriceBlock
          priceInTon={price}
          priceInUsd={usdPrice}
          tonPriceClassName="text-regular"
          tonIconClassName="w-5 h-5"
        />

        <p>{title}</p>
      </div>
    </div>
  </Link>
);
