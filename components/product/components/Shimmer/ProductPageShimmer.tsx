import { OverlayCard } from "components/common/ui/Card";
import { Skeleton } from "components/common/ui/Skeleton";
import { ScrollContainer } from "components/product/components/ScrollContainer";
import { getShimmerElems } from "lib/getShimmerElems";

import { useTheme } from "../../../hooks/useTheme";

import type { FunctionComponent } from "react";

type Props = {
  elems: number[];
};

const ColorsShimmer: FunctionComponent<Props> = ({ elems }) => {
  const { hint_color } = useTheme();

  return (
    <div>
      <div className="py-3">
        <p className={hint_color}>COLOR</p>
      </div>

      <ScrollContainer>
        {elems.map((_, index) => (
          <Skeleton key={index} className="h-8 w-8 !rounded-full" />
        ))}
      </ScrollContainer>
    </div>
  );
};

const SizesShimmer: FunctionComponent<Props> = ({ elems }) => {
  const { ton_accent_blue, hint_color } = useTheme();

  return (
    <div>
      <div className="flex justify-between py-3">
        <span className={hint_color}>SIZE</span>

        <span className={ton_accent_blue}>SIZE GUIDE</span>
      </div>

      <ScrollContainer>
        {elems.map((_, index) => (
          <Skeleton key={index} className="h-[40px] w-[48px] !rounded-md" />
        ))}
      </ScrollContainer>
    </div>
  );
};

const CardTitleShimmer = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-8 w-1/4" />

    <Skeleton className="h-4 w-full" />

    <Skeleton className="h-4 w-2/6" />
  </div>
);

const ImageShimmer = () => (
  <div className="h-96 w-full">
    <Skeleton className="h-full w-full rounded-xl object-cover" />
  </div>
);

export const ProductPageShimmer = () => {
  const sizes = getShimmerElems(7);

  const colors = getShimmerElems(4);

  return (
    <>
      <ImageShimmer />

      <OverlayCard className="min-h-[45vh]">
        <div className="flex flex-col justify-between gap-4 px-4 pb-4">
          <CardTitleShimmer />

          <SizesShimmer elems={sizes} />

          <ColorsShimmer elems={colors} />
        </div>
      </OverlayCard>
    </>
  );
};
