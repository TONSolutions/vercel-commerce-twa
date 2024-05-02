import classNames from "classnames";

import type { FunctionComponent, HTMLAttributes } from "react";

export const Skeleton: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames("bg-contrast-color-15 animate-pulse rounded-xl", className)}
    {...props}
  />
);
