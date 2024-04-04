"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { CartProvider } from "app/providers/CartProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { WebAppProvider } from "app/providers/WebAppProvider";
import { App } from "konsta/react";
import { isIos } from "lib/utils";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MANIFEST_URL = "https://twa-merch-store.local/tonconnect-manifest.json";

const Providers: FunctionComponent<Props> = ({ children }) => {
  const theme = isIos() ? "ios" : "material";

  return (
    <App theme={theme}>
      <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
        <WebAppProvider>
          <CartProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </CartProvider>
        </WebAppProvider>
      </TonConnectUIProvider>
    </App>
  );
};

export default Providers;
