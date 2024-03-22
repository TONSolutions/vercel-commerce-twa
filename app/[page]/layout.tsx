import Footer from 'components/layout/footer';
import { Suspense } from 'react';

import type { FunctionComponent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type: string;
};

const Layout: FunctionComponent<Props> = ({ children }) => (
  <Suspense>
    <div className="w-full">
      <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
        <Suspense>{children}</Suspense>
      </div>
    </div>

    <Footer />
  </Suspense>
);

export default Layout;
