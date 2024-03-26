import classNames from "classnames";
import { Button as KonstaButton } from "konsta/react";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Button: FunctionComponent<Props> = ({ children, className }) => (
  <KonstaButton className={classNames(className, "h-[50px] rounded-xl align-middle")}>
    {children}
  </KonstaButton>
);
