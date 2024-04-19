import StoreLogo from "components/assets/StoreLogo";
import { Skeleton } from "components/common/ui/Skeleton";

export const HeaderShimmer = () => (
  <div className="mx-4 mt-4 flex items-center justify-between">
    <StoreLogo />

    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-[120px]" />

      <Skeleton className="h-10 w-10 !rounded-full" />
    </div>
  </div>
);
