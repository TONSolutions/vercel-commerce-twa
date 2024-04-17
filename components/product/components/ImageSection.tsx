import { Carousel } from "components/common/components/Carousel/Carousel";
import { motion } from "framer-motion";

import type { Image as ImageType } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = {
  images: ImageType[];
};

export const ImageSection: FunctionComponent<Props> = ({ images }) => (
  <motion.div
    initial={{ opacity: 0, y: 70 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.2,
      type: "spring",
      bounce: 0.3
    }}
  >
    <Carousel options={{ loop: true }} withDots dotsClassName="px-3 py-2 bottom-8">
      {images.map(({ url, altText }, index) => (
        <img
          src={url}
          alt={altText}
          key={index}
          className="max-h-96 w-[100%] min-w-0 flex-carousel object-cover"
        />
      ))}
    </Carousel>
  </motion.div>
);
