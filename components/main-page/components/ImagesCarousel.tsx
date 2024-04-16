import { Carousel } from "components/common/components/Carousel/Carousel";

import type { Image } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = {
  images: Image[];
};

export const ImagesCarousel: FunctionComponent<Props> = ({ images }) => (
  <Carousel options={{ loop: true }} withDots>
    {images.map(({ url, altText }, index) => (
      <div className="max-h-[175px] min-w-0 max-w-[175px] flex-carousel px-3 py-2" key={index}>
        <img src={url} alt={altText} className="h-full w-full rounded-xl object-cover" />
      </div>
    ))}
  </Carousel>
);
