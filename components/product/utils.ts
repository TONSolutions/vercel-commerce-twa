import { HEX_CODE_HASH } from "components/product/constants";

import type { Colors } from "components/product/constants";

export const mapColorsToHexCodex = (colors: string[]) =>
  colors.map((color) => ({
    color,
    hex: HEX_CODE_HASH[color.toLowerCase() as Colors]
  }));
