/* eslint-disable import/order */
// eslint-disable-next-line no-restricted-imports
import "./globals.css";

import dynamic from "next/dynamic";

import type { ReactNode } from "react";

const LazyProviders = dynamic(() => import("./providers/Providers"), { ssr: false });

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-black">
        <main className="mx-auto max-w-[430px] bg-[#EFEFF4]">
          <LazyProviders>{children}</LazyProviders>

          <div id="popover-root"></div>

          <div id="toast-root"></div>
        </main>
      </body>
    </html>
  );
}
