import { Skeleton } from "components/common/ui/Skeleton";
import { getShimmerElems } from "lib/getShimmerElems";

const ImageShimmer = () => (
  <div className="h-[64px] w-[64px]">
    <Skeleton className="h-full w-full rounded-xl object-cover" />
  </div>
);

export const CartPageShimmer = () => {
  const elems = getShimmerElems(3);

  return (
    <div className="min-h-screen bg-bg_color px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="flex">
            <h1 className="mr-2 font-bold">Your cart</h1>
          </div>

          <span className="text-[#007AFF]">Clear all</span>
        </div>

        <div className="flex flex-col gap-4">
          {elems.map((_, index) => (
            <div key={index} className="flex gap-4">
              <ImageShimmer />

              <div className="flex w-full max-w-[55%] flex-col gap-2">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-13" />
                </div>

                <Skeleton className="mb-1 h-2 w-full" />

                <Skeleton className="h-2 w-1/4" />
              </div>

              <Skeleton className="h-8 w-[64px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
