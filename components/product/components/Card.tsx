"use client";
import classNames from "classnames";
import TonIcon from "components/icons/TonIcon";
import data from "data/tonRates.json";
import { Link } from "konsta/react";
import { useState, type FunctionComponent } from "react";

import type { Money, ProductVariant } from "lib/shopify/types";

type Props = {
  title: string;
  description: string;
  variants: ProductVariant[];
  price: Money;
  sizes: string[];
  colors: string[];
};

enum Colors {
  Black = "black",
  Grey = "grey",
  Blue = "blue",
  White = "white"
}

const mapColorsToHexCodex = (colors: string[]) => {
  const hexCodesHash = {
    [Colors.Grey]: "#8C8E9B",
    [Colors.Black]: "#000000",
    [Colors.Blue]: "#007AFF",
    [Colors.White]: "#007AFF"
  };

  return colors.map((color) => ({
    color,
    hex: hexCodesHash[color.toLowerCase() as Colors]
  }));
};

export const Card: FunctionComponent<Props> = ({ title, sizes, colors, description, price }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const tonUsdPrice = data.usd;

  const { amount: priceInTon } = price;

  const priceInUsd = (Number(priceInTon) * Number(tonUsdPrice)).toFixed(2);

  const mappedColors = mapColorsToHexCodex(colors);

  const showMappedColors = mappedColors.length > 0;

  return (
    <div className="bg-bg_color absolute bottom-0 left-0 z-10 h-[55vh] w-full rounded-t-xl px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex">
            <TonIcon />

            <span className="text-2xl font-bold">{priceInTon}</span>
          </div>

          <span className="text-hint_color p-1 text-sm">~${priceInUsd}</span>
        </div>

        <div>
          <h1 className="text-base">{title}</h1>

          <p className="text-base">{description}</p>
        </div>

        <div className="flex justify-between pt-3">
          <span>SIZE</span>

          <Link>SIZE GUIDE</Link>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto p-1">
          {sizes.map((size, index) => (
            <span
              className={classNames("rounded-xl bg-[#74748014] px-4 py-3 text-base font-bold", {
                "outline outline-2 outline-[#007AFF]": size === selectedSizeIndex
              })}
              key={index}
              onClick={() => setSelectedSizeIndex(size)}
            >
              {size}
            </span>
          ))}
        </div>

        {showMappedColors ? (
          <div>
            <p>{`COLOR: ${selectedColor.toUpperCase()}`}</p>

            <div className="no-scrollbar flex gap-2 overflow-x-auto p-1">
              {mappedColors.map(({ color, hex }, index) => (
                <span key={index} onClick={() => setSelectedColor(color)}>
                  {hex}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
