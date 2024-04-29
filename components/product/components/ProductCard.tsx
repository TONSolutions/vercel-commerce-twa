"use client";
import ShareIcon from "components/assets/icons/ShareIcon";
import { OverlayCard } from "components/common/ui/Card";
import { CardPriceBlock } from "components/product/components/CardPriceBlock";
import { CardTitleBlock } from "components/product/components/CardTitleBlock";
import { ColorsBlock } from "components/product/components/ColorsBlock";
import { SizesBlock } from "components/product/components/SizesBlock";
import { motion } from "framer-motion";
import { getShareLink } from "lib/getShareLink";
import { usePathname } from "next/navigation";
import { type FunctionComponent } from "react";

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
  tonToUsdPrice: number;
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
  tonToUsdPrice,
  handleSizeChange,
  handleColorChange
}) => {
  const { amount: priceInTon } = price;
  const path = usePathname();

  const priceInUsd = (Number(priceInTon) * tonToUsdPrice).toFixed(2);
  const href = getShareLink({ path });

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <OverlayCard className="min-h-[45vh]">
        <div className="flex flex-col justify-between gap-4 px-4 pb-4">
          <CardPriceBlock priceInTon={priceInTon} priceInUsd={priceInUsd} />

          <a href={href} className="absolute right-4 top-0" target="_blank" rel="noreferrer">
            <ShareIcon />
          </a>

          <CardTitleBlock title={title} description={description} />

          <SizesBlock
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={handleSizeChange}
          />

          <ColorsBlock
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={handleColorChange}
          />
        </div>
      </OverlayCard>
    </motion.div>
  );
};
