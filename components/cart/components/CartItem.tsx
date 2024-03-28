import TonIcon from "components/assets/icons/TonIcon";

import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
  price: string;
  title: string;
  options: string;
  imageUrl: string;
};
export const CartItem: FunctionComponent<Props> = ({
  quantity,
  price,
  title,
  options,
  imageUrl
}) => (
  //TODO replace width with buttons

  <div className="flex gap-4">
    <img src={imageUrl} className="h-16 w-16 rounded-xl" />

    <div className="flex w-full max-w-[70%] flex-col">
      <div className="flex items-center">
        <TonIcon className="h-[22px] w-[22px]" />

        <span className="font-bold">{price}</span>
      </div>

      <p className="truncate text-sm">{title}</p>

      <span className="text-sm text-hint_color">{options}</span>
    </div>

    <div className="self-center text-center font-bold">{quantity}</div>
  </div>
);
