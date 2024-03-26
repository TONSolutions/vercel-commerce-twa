import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ScrollContainer: FunctionComponent<Props> = ({ children }) => (
  <div className="flex gap-2 overflow-x-auto p-1 no-scrollbar">{children}</div>
);
