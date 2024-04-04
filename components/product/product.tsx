"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { ImageSection } from "components/product/components/ImageSection";
import { ProductCard } from "components/product/components/ProductCard";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type FunctionComponent } from "react";

import type { Product } from "lib/shopify/types";

type Props = {
  product: Product;
};

//TODO replace cart

export const ProductPage: FunctionComponent<Props> = ({ product }) => {
  //TODO useTransition for button disable
  const [isPending] = useTransition();
  const { title, images, variants, priceRange, description, options } = product;
  const sizes = options.find((item) => item.name === "Size")?.values ?? [];
  const colors = options.find((item) => item.name === "Color")?.values ?? [];

  const { MainButton } = useWebAppDataConductor();

  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const router = useRouter();

  const price = priceRange.minVariantPrice;

  // const handleAddToCart = () => {
  //   startTransition(() => {
  //     const selectedVariantId = getSelectedVariantId({
  //       variants,
  //       size: selectedSize,
  //       color: selectedColor
  //     });

  //     addToCart({ selectedVariantId }).then(({ success, error }) => {
  //       if (success) {
  //         setIsAdded(true);
  //       }

  //       if (error) {
  //         // TODO error handling
  //       }
  //     });
  //   });
  // };

  const handleAddToCart = () => {
    setIsAdded(true);
  };

  const handleGoToCheckout = async () => {
    // const cartId = (await getValueFromTelegramCloudStorage("cartId")) as string;

    // router.push(`/cart/${prepareCartIdForUrl(cartId)}`);

    router.push("/cart/1");
  };

  useEffect(() => {
    MainButton.show();
    isPending ? MainButton.showProgress() : MainButton.hideProgress();

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
  }, [isAdded, isPending, selectedSize, selectedColor]);

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
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        handleSizeChange={setSelectedSize}
        handleColorChange={setSelectedColor}
      />
    </>
  );
};
