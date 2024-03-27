"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { ImageSection } from "components/product/components/ImageSection";
import { ProductCard } from "components/product/components/ProductCard";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useEffect, useState, type FunctionComponent } from "react";

import type { Product } from "lib/shopify/types";

type Props = {
  product: Product;
};

export const ProductPage: FunctionComponent<Props> = ({ product }) => {
  const { MainButton } = useWebAppDataConductor();
  const [isAdded, setIsAdded] = useState(false);
  const { title, images, variants, priceRange, description, options } = product;

  const sizes = options.find((item) => item.name === "Size")?.values ?? [];
  const colors = options.find((item) => item.name === "Color")?.values ?? [];

  const price = priceRange.minVariantPrice;

  const handleAddToCart = () => {
    //TODO logic
    setIsAdded(true);
  };

  const handleGoToCheckout = () => {
    //TODO logic
  };

  useEffect(() => {
    MainButton.show();
    MainButton.setText(isAdded ? "Added. Go to cart" : "Add to cart");
    MainButton.color = isAdded ? "#e5f1ff" : "#007AFF";
    MainButton.textColor = isAdded ? "#007AFF" : "#FFF";
    MainButton.onClick(isAdded ? handleGoToCheckout : handleAddToCart);

    return () => MainButton.offClick(isAdded ? handleGoToCheckout : handleAddToCart);
  }, [isAdded]);

  return (
    <>
      <BackButton />

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
