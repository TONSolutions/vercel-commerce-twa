import Carousel from "react-material-ui-carousel";

import type { Image as ImageType } from "lib/shopify/types";
import type { FunctionComponent } from "react";

type Props = {
  images: ImageType[];
  title: string;
};

export const ImageSection: FunctionComponent<Props> = ({ images }) => (
  <Carousel
    height={390}
    autoPlay={false}
    swipe
    animation="fade"
    navButtonsAlwaysInvisible
    indicatorIconButtonProps={{
      style: {
        color: "rgba(255, 255, 255, 0.3)",
        marginLeft: "2px",
        marginRight: "2px"
      }
    }}
    activeIndicatorIconButtonProps={{
      style: {
        color: "#FFF"
      }
    }}
    indicatorContainerProps={{
      style: {
        position: "absolute",
        bottom: "15px",
        left: "50%",
        transform: "translate(-50%, 0)",
        padding: "8px 12px",
        zIndex: "40",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        margin: 0,
        width: "max-content"
      }
    }}
  >
    {images.map(({ url, altText }, index) => (
      <img src={url} alt={altText} key={index} className="h-[100%] w-[100%] object-cover" />
    ))}
  </Carousel>
);
