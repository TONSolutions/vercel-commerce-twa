import classNames from "classnames";
import { OrderStatus } from "components/orders/constants";

import type { FunctionComponent } from "react";

type Props = {
  status: OrderStatus;
};
export const StatusBar: FunctionComponent<Props> = ({ status }) => {
  const activePointClassName =
    "after:absolute after:right-[2px] after:top-[2px] after:h-2 after:w-2 after:rounded-full after:bg-button_text_color";

  const passedPointClassName =
    "before:absolute before:left-[2px] before:top-[2px] before:h-2 before:w-2 before:rounded-full before:bg-[#ffffff4D]";

  return (
    <>
      <div className="bg-contrast-color-10 relative my-1 h-3 w-full rounded-xl">
        <span
          className={classNames("bg-ton-accent-blue absolute left-0 top-0 block h-3 rounded-xl", {
            [classNames("w-3", activePointClassName)]: status === OrderStatus.Created,
            [classNames("w-[50%]", activePointClassName, passedPointClassName)]:
              status === OrderStatus.Ready
          })}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>Created</span>

        <span className={classNames({ "text-hint-color": status === OrderStatus.Created })}>
          Ready for pickup
        </span>

        <span className="text-hint-color">Delivered</span>
      </div>
    </>
  );
};
