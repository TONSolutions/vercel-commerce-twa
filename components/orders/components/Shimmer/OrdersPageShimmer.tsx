import { ProductItemShimmer } from "components/common/ui/ProductItemShimmer";
import { Skeleton } from "components/common/ui/Skeleton";
import { getShimmerElems } from "lib/getShimmerElems";

import type { FunctionComponent } from "react";

const OrdersListShimmer: FunctionComponent<{ elems: number[] }> = ({ elems }) => (
  <div className="flex flex-col gap-4 p-4">
    {elems.map((_, index) => (
      <ProductItemShimmer key={index} imageContainerClassName="w-[40px] h-[40px]" />
    ))}
  </div>
);

export const OrdersPageShimmer = () => {
  const elems = getShimmerElems(2);

  return (
    <div className="min-h-screen pt-6">
      <h1 className="mb-3 px-4 text-xl font-bold">My orders</h1>

      <Skeleton className="mx-4 h-7" />

      <OrdersListShimmer elems={elems} />
    </div>
  );
};
