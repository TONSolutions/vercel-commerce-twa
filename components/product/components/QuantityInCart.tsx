import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
};
export const QuantityInCart: FunctionComponent<Props> = ({ quantity }) => (
  <p className="absolute right-0 top-4 z-10 rounded-l-xl bg-bg_color px-3 py-2 text-[#007AFF]">
    In cart: <span className="font-bold">{quantity}</span>
  </p>
);
