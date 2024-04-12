import classNames from "classnames";

import type { FunctionComponent } from "react";

type Props = {
  images: string[];
};

export const ImageStack: FunctionComponent<Props> = ({ images }) => {
  if (!images.length) {
    return null;
  }

  const slicedImages = images.length <= 3 ? images : images.slice(3);

  return (
    <div
      className={classNames("relative mr-4 h-10", {
        "w-10": images.length === 1,
        "w-12": images.length === 2,
        "w-14": images.length === 3
      })}
    >
      {slicedImages.map((image, index) => (
        <img
          key={index}
          className={classNames("absolute h-10 w-10 rounded-xl outline outline-1 outline-[#fff]", {
            "left-0 top-0 z-[3]": index === 0,
            "left-2 top-0 z-[2]": index === 1,
            "left-4 top-0 z-[1]": index === 2
          })}
          src={image}
        />
      ))}
    </div>
  );
};
