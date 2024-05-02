import TonIcon from "components/assets/icons/TonIcon";
import { ActionButtons } from "components/cart/components/ActionButtons";

import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
  price: string;
  title: string;
  options: string;
  imageUrl: string;
  id: string;
};
export const CartItem: FunctionComponent<Props> = ({
  quantity,
  price,
  title,
  options,
  imageUrl,
  id
}) => (
  <div className="flex gap-4">
    <img src={imageUrl} className="h-16 w-16 rounded-xl" alt={title} />

    <div className="flex w-full max-w-[55%] flex-col">
      <div className="flex items-center">
        <TonIcon className="h-[22px] w-[22px]" />

        <span className="font-bold">{price}</span>
      </div>

      <p className="truncate text-sm">{title}</p>

      <span className="text-hint-color text-sm">{options}</span>
    </div>

    <ActionButtons quantity={quantity} id={id} />
  </div>
);
