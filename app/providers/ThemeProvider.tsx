"use client";

import { type FunctionComponent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const ThemeProvider: FunctionComponent<Props> = ({ children }) => (
  //   useEffect(() => {
  //     updateTailwindConfig(themeParams);

  //     return;
  //   }, []);

  <>{children}</>
);
