"use client";

import { ImageSection } from "components/product/components/ImageSection";
import { ProductCard } from "components/product/components/ProductCard";
import { type FunctionComponent } from "react";

import type { Product } from "lib/shopify/types";

type Props = {
  product: Product;
};

export const ProductPage: FunctionComponent<Props> = ({ product }) => {
  const { title, images, variants, priceRange, description, options } = product;

  const sizes = options.find((item) => item.name === "Size")?.values ?? [];
  const colors = options.find((item) => item.name === "Color")?.values ?? [];

  const price = priceRange.minVariantPrice;

  return (
    <>
      <ImageSection images={images} />

      <ProductCard
        title={title}
        variants={variants}
        description={description}
        price={price}
        sizes={sizes}
        colors={colors}
      />
    </>
  );
};
