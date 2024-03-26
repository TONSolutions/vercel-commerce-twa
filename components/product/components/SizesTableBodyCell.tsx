import classNames from "classnames";
import { TableCell } from "components/ui/Table";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export const SizesTableBodyCell: FunctionComponent<Props> = ({ children, className }) => (
  <TableCell className={classNames(className, "border-1 border text-left font-normal")}>
    {children}
  </TableCell>
);
