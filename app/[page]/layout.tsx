import { Suspense } from "react";

import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <Suspense>{children}</Suspense>
    </div>
  );
}
