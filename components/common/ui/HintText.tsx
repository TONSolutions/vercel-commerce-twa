import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const HintText: FunctionComponent<Props> = ({ children }) => (
  <p className="text-hint-color mx-4 px-4 text-sm">{children}</p>
);
