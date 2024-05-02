"use client";
import animationData from "components/assets/animations/duck_surprised.json";
import { AnimationPage } from "components/common/components/AnimationPage";
import { Routes } from "components/constants";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const EmptyCartPage = () => {
  const { MainButton } = useWebAppDataConductor();
  const router = useRouter();

  const handleMainButtonClick = () => {
    router.push(Routes.Main);
  };

  useEffect(() => {
    MainButton.show();
    MainButton.setText("Go to Catalog");
    MainButton.onClick(handleMainButtonClick);
  }, []);

  return (
    <AnimationPage
      animation={animationData}
      title="Your cart is empty"
      subtitle="Explore our new products and bestsellers in the catalog."
      wrapperClassName="bg-color"
    />
  );
};
