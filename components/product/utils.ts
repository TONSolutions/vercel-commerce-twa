/* eslint-disable no-negated-condition */
import { HEX_CODE_HASH } from "components/product/constants";

import type { Colors } from "components/product/constants";
import type { ProductVariant } from "lib/shopify/storefront/types";

export const mapColorsToHexCodex = (colors: string[]) =>
  colors.map((color) => ({
    color,
    hex: HEX_CODE_HASH[color.toLowerCase() as Colors]
  }));

//TODO make universal
export const getSelectedVariantId = ({
  variants,
  size,
  color
}: {
  variants: ProductVariant[];
  size?: string;
  color?: string;
}) => {
  // Iterate through the variants array
  for (const variant of variants) {
    let hasColor = false;
    let hasSize = false;

    // Check if the current variant matches the provided color (if any)
    if (color !== undefined) {
      for (const option of variant.selectedOptions) {
        if (option.name === "Color" && option.value === color) {
          hasColor = true;
          break;
        }
      }
    } else {
      // If color is not provided, consider it as a match
      hasColor = true;
    }

    // Check if the current variant matches the provided size (if any)
    if (size !== undefined) {
      for (const option of variant.selectedOptions) {
        if (option.name === "Size" && option.value === size) {
          hasSize = true;
          break;
        }
      }
    } else {
      // If size is not provided, consider it as a match
      hasSize = true;
    }

    // If both color and size match (or if one of them is not provided),
    // return the ID of the current variant
    if (hasColor && hasSize) {
      return variant.id;
    }
  }

  // If no matching variant is found, return undefined
  return;
};
