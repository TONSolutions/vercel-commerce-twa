'use client';

import { WebAppProvider } from 'components/providers/WebAppProvider';

import type { FunctionComponent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Providers: FunctionComponent<Props> = ({ children }) => (
  <WebAppProvider>{children}</WebAppProvider>
);

export default Providers;
