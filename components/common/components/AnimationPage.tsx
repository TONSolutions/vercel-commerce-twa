/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { Link } from "konsta/react";
import Lottie from "lottie-react";

import type { FunctionComponent } from "react";

type Props = {
  animation: any;
  title: string;
  subtitle: string;
  wrapperClassName?: string;
  linkTitle?: string;
  linkAction?: () => void;
};
export const AnimationPage: FunctionComponent<Props> = ({
  animation,
  title,
  subtitle,
  linkTitle,
  wrapperClassName,
  linkAction
}) => (
  <div
    className={classNames(
      "flex min-h-screen flex-col items-center justify-center p-7",
      wrapperClassName
    )}
  >
    <div className="flex flex-col gap-3">
      <Lottie animationData={animation} loop className="mx-auto h-[30%] w-[30%]" />

      <h1 className=" text-center text-xl font-semibold">{title}</h1>

      <p className="text-center">{subtitle}</p>

      {linkTitle && linkAction ? (
        <Link onClick={linkAction} className="self-center">
          {linkTitle}
        </Link>
      ) : null}
    </div>
  </div>
);
