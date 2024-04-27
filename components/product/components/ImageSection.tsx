import { Carousel } from "components/common/components/Carousel/Carousel";
import { QuantityInCart } from "components/product/components/QuantityInCart";
import { motion } from "framer-motion";

import type { Image as ImageType } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = {
  images: ImageType[];
  quantity: number;
};

export const ImageSection: FunctionComponent<Props> = ({ images, quantity }) => (
  <motion.div
    initial={{ opacity: 0, y: 70 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.2,
      type: "spring",
      bounce: 0.3
    }}
  >
    <div className="relative">
      {quantity > 0 ? <QuantityInCart quantity={quantity} /> : null}

      <Carousel options={{ loop: true }} withDots dotsClassName="px-3 py-2 bottom-8">
        {images.map(({ url, altText }, index) => (
          <img
            src={url}
            alt={altText}
            key={index}
            className="max-h-96 w-full min-w-0 flex-carousel object-cover"
          />
        ))}
      </Carousel>
    </div>
  </motion.div>
);
