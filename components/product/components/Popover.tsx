"use client";
import ReactDOM from "react-dom";

import type { FunctionComponent, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

export const Popover: FunctionComponent<Props> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  const elem = document.getElementById("popover-root");

  if (!elem) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[50] flex items-end justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="h-[55vh] w-full transform overflow-hidden rounded-t-xl bg-white shadow-xl transition-all">
        {children}
      </div>
    </div>,
    elem
  );
};
