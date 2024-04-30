import classNames from "classnames";
import { useTheme } from "components/hooks/useTheme";

import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
};
export const QuantityInCart: FunctionComponent<Props> = ({ quantity }) => {
  const { ton_accent_blue } = useTheme();

  return (
    <p
      className={classNames(
        "absolute right-0 top-4 z-10 rounded-l-xl bg-bg_color px-3 py-2",
        ton_accent_blue
      )}
    >
      In cart: <span className="font-bold">{quantity}</span>
    </p>
  );
};
