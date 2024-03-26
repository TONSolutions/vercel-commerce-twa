"use client";

import { Card } from "components/product/components/Card";
import { ImageSection } from "components/product/components/ImageSection";
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
      <ImageSection title={title} images={images} />

      <Card
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
