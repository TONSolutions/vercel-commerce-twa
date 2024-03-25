"use client";

import WebApp from "@twa-dev/sdk";
import { WebAppDataConductorProvider } from "contexts/WebAppContext";
import { useEffect } from "react";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const WebAppProvider: FunctionComponent<Props> = ({ children }) => {
  useEffect(() => {
    WebApp.ready();
  }, []);

  return <WebAppDataConductorProvider value={WebApp}>{children}</WebAppDataConductorProvider>;
};
