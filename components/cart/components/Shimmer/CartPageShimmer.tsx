import { ProductItemShimmer } from "components/common/ui/ProductItemShimmer";
import { useTheme } from "components/hooks/useTheme";
import { getShimmerElems } from "lib/getShimmerElems";

export const CartPageShimmer = () => {
  const elems = getShimmerElems(3);
  const { ton_accent_blue } = useTheme();

  return (
    <div className="min-h-screen bg-bg_color px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="flex">
            <h1 className="mr-2 font-bold">Your cart</h1>
          </div>

          <span className={ton_accent_blue}>Clear all</span>
        </div>

        <div className="flex flex-col gap-4">
          {elems.map((_, index) => (
            <ProductItemShimmer key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
