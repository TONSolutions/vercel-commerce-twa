import type { Money } from "lib/shopify/storefront/types";

export type MappedColor = {
  color: string;
  hex: string;
};

export type SelectedOptions = { size: string; color: string };

export type MappedVariant = {
  selectedOptions: SelectedOptions;
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
};

export type ColorsAndSizes = {
  [k: string]: string[];
};
