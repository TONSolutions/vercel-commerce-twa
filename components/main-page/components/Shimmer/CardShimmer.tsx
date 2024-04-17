import { OverlayCard } from "components/common/ui/Card";
import { Skeleton } from "components/common/ui/Skeleton";

import type { FunctionComponent } from "react";

type Props = {
  elems: number[];
};

const PriceShimmer = () => (
  <div className="mb-1 flex gap-2">
    <div className="flex items-center">
      <Skeleton className="mr-1 h-5 w-5" />

      <Skeleton className="h-5 w-8" />
    </div>

    <Skeleton className="h-5 w-12 self-end p-1" />
  </div>
);

const ImageShimmer = () => (
  <div className="h-[175px] w-[175px]">
    <Skeleton className="h-full w-full rounded-xl object-cover" />
  </div>
);

const ProductShimmer = () => (
  <div className="flex flex-col gap-3">
    <ImageShimmer />

    <div>
      <PriceShimmer />

      <Skeleton className="h-5 w-[75%]" />
    </div>
  </div>
);

const CategoriesShimmer: FunctionComponent<Props> = ({ elems }) => (
  <div>
    <div className="w-full overflow-x-scroll pl-4  no-scrollbar">
      <div className="flex gap-2">
        {elems.map((_, index) => (
          <Skeleton key={index} className="my-3 h-6 w-15" />
        ))}
      </div>
    </div>
  </div>
);

export const CardShimmer = () => {
  const elems = [0, 1, 2, 3];

  return (
    <OverlayCard>
      <h2 className="mb-1 px-4 text-xl font-bold">Product catalog</h2>

      <CategoriesShimmer elems={elems} />

      <>
        <div className="mt-0">
          <div className="grid grid-cols-2 gap-2 p-4">
            {elems.map((_, index) => (
              <ProductShimmer key={index} />
            ))}
          </div>
        </div>
      </>
    </OverlayCard>
  );
};
