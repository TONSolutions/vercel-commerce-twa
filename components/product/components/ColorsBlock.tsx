import classNames from "classnames";
import { ScrollContainer } from "components/product/components/ScrollContainer";
import { Colors } from "components/product/constants";

import type { MappedColor } from "components/product/types";
import type { FunctionComponent } from "react";

type Props = {
  mappedColors: MappedColor[];
  selectedColor: string;

  setSelectedColor: (color: string) => void;
};
export const ColorsBlock: FunctionComponent<Props> = ({
  selectedColor,
  mappedColors,
  setSelectedColor
}) => (
  <div>
    <div className="py-3">
      <p className="text-[#6D6D72]">{`COLOR: ${selectedColor.toUpperCase()}`}</p>
    </div>

    <ScrollContainer>
      {mappedColors.map(({ color, hex }, index) => (
        <span
          key={index}
          onClick={() => setSelectedColor(color)}
          className={classNames(`h-[38px] w-[38px] rounded-full p-1 bg-[${hex}] outline-offset-2`, {
            [`outline-[${hex}] outline outline-2`]:
              color === selectedColor && color.toLowerCase() !== Colors.White,
            ["border-1 border border-[#C8C7CB]"]:
              color !== selectedColor && color.toLowerCase() === Colors.White,
            ["border-1 border border-[#C8C7CB] outline outline-2 outline-[#C8C7CB]"]:
              color === selectedColor && color.toLowerCase() === Colors.White
          })}
        />
      ))}
    </ScrollContainer>
  </div>
);
