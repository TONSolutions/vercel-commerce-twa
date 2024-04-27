import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
};
export const QuantityInCart: FunctionComponent<Props> = ({ quantity }) => (
  <p className="absolute -right-6 top-4 z-10 rounded-xl bg-bg_color py-2 pl-3 pr-8 text-[#007AFF]">
    In cart: <span className="font-bold">{quantity}</span>
  </p>
);
