import classNames from "classnames";
import { ScrollContainer } from "components/product/components/ScrollContainer";
import { Colors, DEFAULT_COLORS } from "components/product/constants";
import { mapColorsToHexCode } from "components/product/utils";

import type { MappedColor } from "components/product/types";
import type { FunctionComponent } from "react";

type Props = {
  colors: string[];
  selectedColor: string;

  setSelectedColor: (color: string) => void;
};
export const ColorsBlock: FunctionComponent<Props> = ({
  selectedColor,
  colors,
  setSelectedColor
}) => {
  const mappedColors: MappedColor[] = mapColorsToHexCode(DEFAULT_COLORS);

  return (
    <div>
      <div className="py-3">
        <p className="text-hint-color">{`COLOR: ${selectedColor.toUpperCase()}`}</p>
      </div>

      <ScrollContainer>
        {mappedColors.map(({ color, hex }, index) => (
          <span
            key={index}
            onClick={() => setSelectedColor(color)}
            className={classNames(
              `h-[38px] w-[38px] rounded-full p-1 bg-[${hex}] cursor-pointer outline-offset-2`,
              {
                [`outline-[${hex}] outline outline-2`]:
                  color === selectedColor && color.toLowerCase() !== Colors.White,
                "border-1 border border-[#C8C7CB]":
                  color !== selectedColor && color.toLowerCase() === Colors.White,
                "border-1 border border-[#C8C7CB] outline outline-2 outline-[#C8C7CB]":
                  color === selectedColor && color.toLowerCase() === Colors.White,
                "pointer-events-none opacity-50": !colors.includes(color)
              }
            )}
          />
        ))}
      </ScrollContainer>
    </div>
  );
};
