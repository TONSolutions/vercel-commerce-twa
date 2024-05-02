import { ProductItemShimmer } from "components/common/ui/ProductItemShimmer";
import { Skeleton } from "components/common/ui/Skeleton";
import { getShimmerElems } from "lib/getShimmerElems";

import type { FunctionComponent } from "react";

type Props = {
  title: string;
  isOrderPage?: boolean;
};

const TotalSectionShimmer = () => (
  <div className="pl-4">
    <div className="relative flex justify-between py-4 pr-4 text-xl font-semibold hairline-t">
      <Skeleton className="h-5 w-[111px]" />

      <Skeleton className="h-5 w-[73px]" />
    </div>
  </div>
);

const CheckoutListShimmer: FunctionComponent<{ elems: number[] }> = ({ elems }) => (
  <div className="flex flex-col gap-4 p-4">
    {elems.map((_, index) => (
      <ProductItemShimmer key={index} imageContainerClassName="w-[40px] h-[40px]" />
    ))}
  </div>
);

export const CheckoutPageShimmer: FunctionComponent<Props> = ({ title, isOrderPage }) => {
  const elems = getShimmerElems(3);

  return (
    <div className="pt-6">
      <div className="flex justify-between">
        <h1 className="mb-3 px-4 text-xl font-bold">{title}</h1>

        {isOrderPage ? <Skeleton className="h-5 w-[97px]" /> : null}
      </div>

      <div className="bg-color m-4 rounded-xl">
        <CheckoutListShimmer elems={elems} />

        <TotalSectionShimmer />
      </div>
    </div>
  );
};
