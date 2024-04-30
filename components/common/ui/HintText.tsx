import classNames from "classnames";
import { useTheme } from "components/hooks/useTheme";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const HintText: FunctionComponent<Props> = ({ children }) => {
  const { hint_color } = useTheme();

  return <p className={classNames("mx-4 px-4 text-sm", hint_color)}>{children}</p>;
};
