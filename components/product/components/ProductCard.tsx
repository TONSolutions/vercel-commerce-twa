"use client";
import { CardPriceBlock } from "components/product/components/CardPriceBlock";
import { CardTitleBlock } from "components/product/components/CardTitleBlock";
import { ColorsBlock } from "components/product/components/ColorsBlock";
import { SizesBlock } from "components/product/components/SizesBlock";
import { mapColorsToHexCodex } from "components/product/utils";
import { Card } from "components/ui/Card";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import data from "data/tonRates.json"; //TODO replace on fetched;
import { useEffect, useState, type FunctionComponent } from "react";

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

export const ProductCard: FunctionComponent<Props> = ({
  title,
  sizes,
  colors,
  description,
  price
}) => {
  const { MainButton } = useWebAppDataConductor();
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const tonUsdPrice = data.usd;

  const { amount: priceInTon } = price;

  const priceInUsd = (Number(priceInTon) * Number(tonUsdPrice)).toFixed(2);

  const mappedColors: MappedColor[] = mapColorsToHexCodex(colors);

  const showMappedColors = mappedColors.length > 0;
  const showSizes = sizes.length > 0;

  useEffect(() => {
    MainButton.show();
    MainButton.setText("Add to Cart");
  }, []);

  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 px-4 pb-4">
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
    </Card>
  );
};
