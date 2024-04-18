"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { Routes } from "components/constants";
import { addToCart } from "components/product/actions";
import { ImageSection } from "components/product/components/ImageSection";
import { ProductCard } from "components/product/components/ProductCard";
import { useVariants } from "components/product/hooks/useVariants";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type FunctionComponent } from "react";

import type { Product } from "lib/shopify/storefront/types";

type Props = {
  product: Product;
  tonToUsdPrice: number;
};

export const ProductPage: FunctionComponent<Props> = ({ product, tonToUsdPrice }) => {
  const [isPending, startTransition] = useTransition();
  const { title, images, variants, priceRange, description } = product;
  const {
    size = "",
    sizes,
    colors,
    color = "",
    handleColorChange,
    handleSizeChange,
    selectedVariantId
  } = useVariants({
    variants
  });

  const { MainButton } = useWebAppDataConductor();
  const { setCart } = useCartDataConductor();

  const [isAdded, setIsAdded] = useState(false);

  const router = useRouter();

  const price = priceRange.minVariantPrice;

  const handleAddToCart = () => {
    startTransition(() => {
      addToCart({ selectedVariantId }).then(({ success, error, data }) => {
        if (success) {
          setCart(data);
          setIsAdded(true);
        }

        if (error) {
          console.error(error);
          // TODO error handling
        }
      });
    });
  };

  const handleGoToCheckout = () => {
    router.push(Routes.CartItems);
  };

  useEffect(() => {
    MainButton.show();
    MainButton.hideProgress();

    if (isPending) {
      MainButton.showProgress();
    }

    if (!sizes.length) {
      MainButton.hide();
    }

    if (isAdded) {
      MainButton.setText("Added.Go to cart");
      MainButton.color = "#e5f1ff";
      MainButton.onClick(handleGoToCheckout);
      MainButton.textColor = "#007AFF";

      return () => MainButton.offClick(handleGoToCheckout);
    }

    if (!isAdded) {
      MainButton.setText("Add to cart");
      MainButton.color = "#007AFF";
      MainButton.onClick(handleAddToCart);
      MainButton.textColor = "#FFF";

      return () => MainButton.offClick(handleAddToCart);
    }
  }, [isAdded, isPending, selectedVariantId, sizes.length]);

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
        selectedSize={size}
        selectedColor={color}
        tonToUsdPrice={tonToUsdPrice}
        handleSizeChange={handleSizeChange}
        handleColorChange={handleColorChange}
      />
    </>
  );
};
