"use client";
import { CardPriceBlock } from "components/product/components/CardPriceBlock";
import { CardTitleBlock } from "components/product/components/CardTitleBlock";
import { ColorsBlock } from "components/product/components/ColorsBlock";
import { SizesBlock } from "components/product/components/SizesBlock";
import { HEX_CODE_HASH } from "components/product/constants";
import data from "data/tonRates.json"; //TODO replace on fetched;
import { Button } from "konsta/react";
import { useState, type FunctionComponent } from "react";

import type { Colors } from "components/product/constants";
import type { MappedColor } from "components/product/types";
import type { Money, ProductVariant } from "lib/shopify/types";

type Props = {
  title: string;
  description: string;
  variants: ProductVariant[];
  price: Money;
  sizes: string[];
  colors: string[];
};

const mapColorsToHexCodex = (colors: string[]) =>
  colors.map((color) => ({
    color,
    hex: HEX_CODE_HASH[color.toLowerCase() as Colors]
  }));

export const Card: FunctionComponent<Props> = ({ title, sizes, colors, description, price }) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const tonUsdPrice = data.usd;

  const { amount: priceInTon } = price;

  const priceInUsd = (Number(priceInTon) * Number(tonUsdPrice)).toFixed(2);

  const mappedColors: MappedColor[] = mapColorsToHexCodex(colors);

  const showMappedColors = mappedColors.length > 0;
  const showSizes = sizes.length > 0;

  return (
    <div className="absolute bottom-0 left-0 z-10 flex h-[55vh] w-full flex-col justify-between rounded-t-xl bg-bg_color">
      <div className="flex flex-col justify-between gap-4 p-4">
        <CardPriceBlock priceInTon={priceInTon} priceInUsd={priceInUsd} />

        <CardTitleBlock title={title} description={description} />

        {showSizes ? (
          <SizesBlock sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        ) : null}

        {showMappedColors ? (
          <ColorsBlock
            mappedColors={mappedColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        ) : null}
      </div>

      <div className="p-4">
        <Button className="h-[50px] rounded-xl align-middle font-bold">Add to cart</Button>
      </div>
    </div>
  );
};
