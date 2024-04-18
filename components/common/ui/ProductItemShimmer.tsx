import { Skeleton } from "components/common/ui/Skeleton";

import type { FunctionComponent } from "react";

const ImageShimmer = () => <Skeleton className="h-full w-full rounded-xl object-cover" />;

type Props = {
  imageContainerClassName?: string;
};

export const ProductItemShimmer: FunctionComponent<Props> = ({
  imageContainerClassName = "h-[64px] w-[64px]"
}) => (
  <div className="flex justify-between gap-3">
    <div className={imageContainerClassName}>
      <ImageShimmer />
    </div>

    <div className="flex w-full max-w-[55%] flex-col gap-2">
      <div className="flex items-center">
        <Skeleton className="h-5 w-13" />
      </div>

      <Skeleton className="h-2 w-full" />

      <Skeleton className="h-2 w-1/4" />
    </div>

    <Skeleton className="h-8 w-[64px]" />
  </div>
);
