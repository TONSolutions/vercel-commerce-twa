import { BannersShimmer } from "components/main-page/components/Shimmer/BannersShimmer";
import { CardShimmer } from "components/main-page/components/Shimmer/CardShimmer";
import { HeaderShimmer } from "components/main-page/components/Shimmer/HeaderShimmer";

export const MainPageShimmer = () => (
  <div className="flex min-h-screen flex-col gap-6">
    <HeaderShimmer />

    <BannersShimmer />

    <CardShimmer />
  </div>
);
