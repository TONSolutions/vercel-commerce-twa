import classNames from "classnames";
import { ScrollContainer } from "components/product/components/ScrollContainer";
import { Link } from "konsta/react";

import type { FunctionComponent } from "react";

type Props = {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

export const SizesBlock: FunctionComponent<Props> = ({ sizes, selectedSize, setSelectedSize }) => (
  <div>
    <div className="flex justify-between py-3">
      <span className="text-[#6D6D72]">SIZE</span>

      <Link>SIZE GUIDE</Link>
    </div>

    <ScrollContainer>
      {sizes.map((size, index) => (
        <span
          className={classNames("rounded-xl bg-[#74748014] px-4 py-3 text-base font-bold", {
            "outline outline-2 outline-[#007AFF]": size === selectedSize
          })}
          key={index}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </span>
      ))}
    </ScrollContainer>
  </div>
);
