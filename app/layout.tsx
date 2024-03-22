/* eslint-disable import/order */
// eslint-disable-next-line no-restricted-imports
import "./globals.css";

import Navbar from "components/layout/navbar";
import { GeistSans } from "geist/font";
import { ensureStartsWith } from "lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import type { ReactNode } from "react";

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, "@") : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, "https://") : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SITE_NAME!",
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: "summary_large_image",
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

const LazyProviders = dynamic(() => import("../components/providers/Providers"), { ssr: false });

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />

        <Suspense>
          <main>
            <LazyProviders>{children}</LazyProviders>
          </main>
        </Suspense>
      </body>
    </html>
  );
}
