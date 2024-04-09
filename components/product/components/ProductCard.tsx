"use client";
import { OverlayCard } from "components/common/ui/Card";
import { CardPriceBlock } from "components/product/components/CardPriceBlock";
import { CardTitleBlock } from "components/product/components/CardTitleBlock";
import { ColorsBlock } from "components/product/components/ColorsBlock";
import { SizesBlock } from "components/product/components/SizesBlock";
import { mapColorsToHexCodex } from "components/product/utils";
import data from "data/tonRates.json"; //TODO replace on fetched;
import { motion } from "framer-motion";
import { type FunctionComponent } from "react";

import type { MappedColor } from "components/product/types";
import type { Money, ProductVariant } from "lib/shopify/storefront/types";

type Props = {
  title: string;
  description: string;
  variants: ProductVariant[];
  price: Money;
  sizes: string[];
  colors: string[];
  selectedSize: string;
  selectedColor: string;
  handleSizeChange: (size: string) => void;
  handleColorChange: (color: string) => void;
};

export const ProductCard: FunctionComponent<Props> = ({
  title,
  sizes,
  colors,
  description,
  price,
  selectedSize,
  selectedColor,
  handleSizeChange,
  handleColorChange
}) => {
  const tonUsdPrice = data.usd;

  const { amount: priceInTon } = price;

  const priceInUsd = (Number(priceInTon) * Number(tonUsdPrice)).toFixed(2);

  const mappedColors: MappedColor[] = mapColorsToHexCodex(colors);

  const showMappedColors = mappedColors.length > 0;
  const showSizes = sizes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <OverlayCard className="min-h-[45vh]">
        <div className="flex flex-col justify-between gap-4 px-4 pb-4">
          <CardPriceBlock priceInTon={priceInTon} priceInUsd={priceInUsd} />

          <CardTitleBlock title={title} description={description} />

          {showSizes ? (
            <SizesBlock
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={handleSizeChange}
            />
          ) : null}

          {showMappedColors ? (
            <ColorsBlock
              mappedColors={mappedColors}
              selectedColor={selectedColor}
              setSelectedColor={handleColorChange}
            />
          ) : null}
        </div>
      </OverlayCard>
    </motion.div>
  );
};
