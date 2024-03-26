import classNames from "classnames";
import { TableHead } from "components/ui/Table/Table";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export const SizesHeaderTableCell: FunctionComponent<Props> = ({ children, className }) => (
  <TableHead className={classNames(className, "border-1 border bg-[#74748014] font-normal")}>
    {children}
  </TableHead>
);
