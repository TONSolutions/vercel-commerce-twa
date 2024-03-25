"use client";

import { roboto, sfPro } from "app/fonts";
import classNames from "classnames";
import { WebAppProvider } from "components/providers/WebAppProvider";
import { isIos } from "lib/utils";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Providers: FunctionComponent<Props> = ({ children }) => {
  const showIosFont = isIos();

  return (
    <div
      className={classNames("text-black", `${showIosFont ? sfPro.className : roboto.className}`)}
    >
      <WebAppProvider>{children}</WebAppProvider>
    </div>
  );
};

export default Providers;
