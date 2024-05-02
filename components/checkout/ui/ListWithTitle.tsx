import { List } from "konsta/react";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};
export const ListWithTitle: FunctionComponent<Props> = ({ children, title }) => (
  <div>
    <h1 className="text-hint-color mb-1 ml-8 text-sm uppercase">{title}</h1>

    <List className="mx-4 my-[unset]" strongIos>
      {children}
    </List>
  </div>
);
