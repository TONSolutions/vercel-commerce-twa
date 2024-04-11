import type { Image } from "lib/shopify/storefront/types";

export type Banner = {
  bg_colors_list: string[] | null;
  crop_image: string;
  image: string | null;
  link_color: string | null;
  link_text: string | null;
  link_url: string | null;
  thumbnail: Image;
  title: string;
  title_color: string | null;
};
