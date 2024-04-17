import { Skeleton } from "components/common/ui/Skeleton";

export const BannersShimmer = () => (
  <div className="mx-4 mb-4 ">
    <h1 className="mb-0 px-4 text-xl font-bold">🔥 Speсial offers</h1>

    <Skeleton className="my-[22px] h-24 w-full" />
  </div>
);
