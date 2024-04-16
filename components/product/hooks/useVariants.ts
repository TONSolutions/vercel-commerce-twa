import { prepareVariants } from "components/product/utils";
import { useEffect, useMemo, useState, useTransition } from "react";

import type { ProductVariant } from "lib/shopify/storefront/types";

type Options = {
  variants: ProductVariant[];
};
export const useVariants = ({ variants }: Options) => {
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();
  const [isSizesLoading, startTransition] = useTransition();

  const preparedVariants = useMemo(() => prepareVariants(variants), [variants.length]);
  const sizes = Object.keys(preparedVariants);
  const colors = preparedVariants[size ?? ""] ?? [];

  useEffect(() => {
    const size = sizes[0];

    handleSizeChange(size);
  }, []);

  useEffect(() => {
    handleIdChange(size, color);
  }, [size, color]);

  const handleIdChange = (size: string = "", color: string = "") => {
    startTransition(() => {
      const { id } = variants.find(
        ({ title }) => title.includes(size) && title.includes(color)
      ) ?? { id: undefined };

      if (id) {
        setSelectedVariantId(id);
      }
    });
  };

  const handleSizeChange = (variant: string) => {
    startTransition(() => {
      const color = preparedVariants[variant][0];

      setSize(variant);
      handleColorChange(color);
    });
  };

  const handleColorChange = (variant: string) => {
    startTransition(() => {
      setColor(variant);
    });
  };

  return {
    sizes,
    size,
    colors,
    color,
    handleColorChange,
    handleSizeChange,
    selectedVariantId,
    isSizesLoading
  };
};
