/* eslint-disable import/order */
// eslint-disable-next-line no-restricted-imports
import "./globals.css";

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
    default: "Ton Merch Store",
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
    <html lang="en">
      <body className=" text-black">
        <main>
          <Suspense>
            <LazyProviders>{children}</LazyProviders>
          </Suspense>
        </main>
      </body>
    </html>
  );
}
