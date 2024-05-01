import classNames from "classnames";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const OverlayCard: FunctionComponent<Props> = ({ children, className }) => (
  <div
    className={classNames(
      className,
      "before:bg-color bg-color before:width-full relative z-10 flex w-full flex-col justify-between before:absolute before:left-0 before:top-[-15px] before:h-4 before:w-full before:rounded-t-xl"
    )}
  >
    {children}
  </div>
);
