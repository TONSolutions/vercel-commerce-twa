"use client";
import type { FunctionComponent } from "react";

type Props = {
  order: string;
};

export const OrderPage: FunctionComponent<Props> = ({ order }) => {
  console.log(order);

  return <h1>Im order page! </h1>;
};
