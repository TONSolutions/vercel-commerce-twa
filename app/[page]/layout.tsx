import { Suspense } from "react";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: string;
};

const Layout: FunctionComponent<Props> = ({ children }) => (
  <Suspense>
    <div className="w-full">
      <Suspense>{children}</Suspense>
    </div>
  </Suspense>
);

export default Layout;
