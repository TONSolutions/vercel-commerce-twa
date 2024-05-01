import classNames from "classnames";
import { TableHead } from "components/common/ui/Table";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export const SizesHeaderTableCell: FunctionComponent<Props> = ({ children, className }) => (
  <TableHead className={classNames(className, "border-1 bg-contrast-color-10 border font-normal")}>
    {children}
  </TableHead>
);
