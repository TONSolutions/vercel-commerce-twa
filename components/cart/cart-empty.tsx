"use client";
import animationData from "components/assets/animations/duck_surprised.json";
import { Routes } from "components/constants";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import Lottie from "lottie-react";
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg_color p-7">
      <div>
        <Lottie animationData={animationData} loop className="mx-auto mb-3 h-[30%] w-[30%]" />

        <h1 className="mb-2 text-center text-xl font-semibold">Your cart is empty</h1>

        <p className="text-center">Explore our new products and bestsellers in the catalog.</p>
      </div>
    </div>
  );
};
