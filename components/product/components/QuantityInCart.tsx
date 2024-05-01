import classNames from "classnames";

import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
};
export const QuantityInCart: FunctionComponent<Props> = ({ quantity }) => (
  <p
    className={classNames(
      "bg-color text-ton-accent-blue absolute right-0 top-4 z-10 rounded-l-xl px-3 py-2"
    )}
  >
    In cart: <span className="font-bold">{quantity}</span>
  </p>
);
