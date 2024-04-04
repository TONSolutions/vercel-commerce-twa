"use client";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0.5, y: 250 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ width: "100%" }}
      >
        <div className="fixed inset-0 ">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="h-[55vh] w-full transform overflow-hidden rounded-t-xl bg-white shadow-xl ">
          {children}
        </div>
      </motion.div>
    </div>,
    elem
  );
};
