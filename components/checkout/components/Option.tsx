import CaretRightIcon from "components/assets/icons/CaretRightIcon";

import type { FunctionComponent } from "react";

type Props = {
  title: string;
  option: string;
  clickable?: boolean;
};
export const Option: FunctionComponent<Props> = ({ title, option, clickable = false }) => (
  <div className="flex justify-between py-2 first:pt-0 last:pb-0">
    <span>{title}</span>

    <div className="flex items-center text-hint_color">
      <span>{option}</span>

      {clickable ? <CaretRightIcon className="ml-3 h-3 w-2" /> : null}
    </div>
  </div>
);
