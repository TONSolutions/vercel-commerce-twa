/* eslint-disable no-negated-condition */
import { HEX_CODE_HASH } from "components/product/constants";

import type { Colors } from "components/product/constants";
import type { ColorsAndSizes, MappedVariant, SelectedOptions } from "components/product/types";
import type { ProductVariant } from "lib/shopify/storefront/types";

export const mapColorsToHexCode = (colors: string[]) =>
  colors.map((color) => ({
    color,
    hex: HEX_CODE_HASH[color.toLowerCase() as Colors]
  }));

export const prepareVariants = (variants: ProductVariant[]) => {
  const filteredVariants = variants?.filter(({ availableForSale }) => availableForSale);

  const mappedVariants: MappedVariant[] = filteredVariants?.map((variant) => {
    const selectedOptions = variant.selectedOptions.reduce<SelectedOptions>(
      (acc, { name, value }) => ({ ...acc, [name.toLowerCase()]: value }),
      {} as SelectedOptions
    );

    return { ...variant, selectedOptions };
  });

  return mappedVariants.reduce<ColorsAndSizes>((acc, curr) => {
    const size = curr.selectedOptions.size;
    const color = curr.selectedOptions.color;

    if (!(size in acc)) {
      return { ...acc, [size]: [color] };
    }

    const sizes = acc[size];

    if (!sizes.length) {
      return acc;
    }

    return { ...acc, [size]: [...sizes, color] };
  }, {});
};
