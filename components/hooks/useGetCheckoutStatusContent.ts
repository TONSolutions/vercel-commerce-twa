/* eslint-disable no-console */
import successAnimation from "components/assets/animations/boomstick.json";
import processingAnimation from "components/assets/animations/duck_loading.json";
import errorAnimation from "components/assets/animations/duck_sad.json";
import { ProcessingStatus, Routes } from "components/constants";
import { useRouter } from "next/navigation";

export const useGetCheckoutStatusContent = (status: ProcessingStatus) => {
  const router = useRouter();

  //TODO IMPLEMENT ORDER NUMBER

  const content = {
    [ProcessingStatus.NotStarted]: {
      animation: processingAnimation,
      title: "Checking your payment",
      subtitle: "Hold on a second, we need to make sure the payment went through successfully.",
      linkTitle: "Contact Support",
      linkAction: () => console.log("triggered"), //TODO IMPLEMENT
      buttonSettings: null
    },
    [ProcessingStatus.Started]: {
      animation: processingAnimation,
      title: "Checking your payment",
      subtitle: "Hold on a second, we need to make sure the payment went through successfully.",
      linkTitle: "Contact Support",
      linkAction: () => console.log("triggered"), //TODO IMPLEMENT
      buttonSettings: null
    },
    [ProcessingStatus.Error]: {
      animation: errorAnimation,
      title: "Something went wrong!",
      subtitle: "Your payment method was rejected, try again later or contact our support.",
      linkTitle: "Contact Support",
      linkAction: () => console.log("triggered"), //TODO IMPLEMENT
      buttonSettings: {
        title: "Go to checkout",
        bgColor: "e5f1ff",
        textColor: "007AFF",
        handleClick: () => router.push(Routes.Checkout)
      }
    },
    [ProcessingStatus.Success]: {
      animation: successAnimation,
      title: "Order successfully paid!",
      subtitle: `Your order was successfully created, you can check its status in my orders section.`,
      linkTitle: "Go to my orders",
      linkAction: () => router.push(Routes.Orders),
      buttonSettings: {
        title: "Go to catalog",
        bgColor: "e5f1ff",
        textColor: "007AFF",
        handleClick: () => router.push(Routes.Main)
      }
    }
  };

  return content[status];
};
