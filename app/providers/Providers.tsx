"use client";

import { ThemeProvider } from "app/providers/ThemeProvider";
import { WebAppProvider } from "app/providers/WebAppProvider";
import { App } from "konsta/react";
import { isIos } from "lib/utils";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Providers: FunctionComponent<Props> = ({ children }) => {
  const theme = isIos() ? "ios" : "material";

  return (
    <App theme={theme}>
      <WebAppProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </WebAppProvider>
    </App>
  );
};

export default Providers;
