import classNames from "classnames";
import { useTheme } from "components/hooks/useTheme";
import { List } from "konsta/react";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};
export const ListWithTitle: FunctionComponent<Props> = ({ children, title }) => {
  const { hint_color } = useTheme();

  return (
    <div>
      <h1 className={classNames("mb-1 ml-8 text-sm uppercase", hint_color)}>{title}</h1>

      <List className="mx-4 my-[unset]" strongIos>
        {children}
      </List>
    </div>
  );
};
