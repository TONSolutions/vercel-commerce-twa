import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const HintText: FunctionComponent<Props> = ({ children }) => (
  <p className="mx-4 px-4 text-sm text-[#6D6D72]">{children}</p>
);
