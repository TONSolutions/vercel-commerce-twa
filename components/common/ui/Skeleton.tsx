import classNames from "classnames";

import type { FunctionComponent } from "react";

export const Skeleton: FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={classNames("animate-pulse rounded-xl bg-[#7474801F]", className)} {...props} />
);
