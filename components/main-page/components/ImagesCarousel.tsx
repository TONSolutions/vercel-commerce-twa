import { Carousel } from "components/common/components/Carousel/Carousel";

import type { Image } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = {
  images: Image[];
};

export const ImagesCarousel: FunctionComponent<Props> = ({ images }) => (
  <Carousel options={{ loop: false }} withDots dotsClassName="px-2 py-1">
    {images.map(({ url, altText }, index) => (
      <div className="h-[175px] w-[175px] flex-carousel" key={index}>
        <img src={url} alt={altText} className="h-full w-full rounded-xl object-cover" />
      </div>
    ))}
  </Carousel>
);
