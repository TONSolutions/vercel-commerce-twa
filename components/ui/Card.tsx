import classNames from "classnames";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Card: FunctionComponent<Props> = ({ children, className }) => (
  <div
    className={classNames(
      className,
      "before:width-full absolute bottom-0 left-0 z-10 flex w-full flex-col justify-between bg-bg_color before:absolute before:left-0 before:top-[-15px] before:h-4 before:w-full before:rounded-t-xl before:bg-bg_color"
    )}
  >
    {children}
  </div>
);
