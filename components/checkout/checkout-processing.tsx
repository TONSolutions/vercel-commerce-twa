"use client";
import { useTonAddress } from "@tonconnect/ui-react";
import { clearCart } from "components/cart/actions";
import { markOrderAsPaid } from "components/checkout/actions";
import { ProcessingStatus } from "components/constants";
import { useGetCheckoutStatusContent } from "components/hooks/useGetCheckoutStatusContent";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { Link } from "konsta/react";
import { pollTransactionStatus } from "lib/pollTransactionStatus";
import {
  getValueFromTelegramCloudStorage,
  prepareCartIdForRequest,
  setValueFromTelegramCloudStorage
} from "lib/utils";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

import type { FunctionComponent } from "react";

type Props = {
  amount: string;
};

export const CheckoutProcessingPage: FunctionComponent<Props> = ({ amount }) => {
  const [status, setStatus] = useState(ProcessingStatus.NotStarted);

  const { cart, cartId, setCart } = useCartDataConductor();

  const { title, subtitle, linkTitle, linkAction, buttonSettings, animation } =
    useGetCheckoutStatusContent(status);

  const { MainButton } = useWebAppDataConductor();

  const address = useTonAddress(false);

  useEffect(() => {
    if (buttonSettings) {
      const { title, textColor, bgColor, handleClick } = buttonSettings;

      MainButton.show();
      MainButton.setText(title);
      MainButton.color = `#${bgColor}`;
      MainButton.textColor = `#${textColor}`;
      MainButton.onClick(handleClick);
      MainButton.hide();
    } else {
      MainButton.hide();
    }
  }, [status]);

  useEffect(() => {
    setStatus(ProcessingStatus.Processing);

    pollTransactionStatus(address, Number(amount))
      .then((status) => setStatus(status))
      .catch((status) => setStatus(status));
  }, []);

  useEffect(() => {
    if (status === ProcessingStatus.Success) {
      if (cartId && cart) {
        const itemIds = cart.lines.map(({ id }) => id);
        clearCart(prepareCartIdForRequest(cartId), itemIds).then(
          async ({ success, data, error }) => {
            if (success) {
              setCart(data);

              const draftOrderId = (await getValueFromTelegramCloudStorage(
                "draftOrderId"
              )) as string;

              //TODO GRAB ORDER ID

              markOrderAsPaid(draftOrderId).then(({ success, error }) => {
                if (success) {
                  setValueFromTelegramCloudStorage("draftOrderId", "");
                }

                if (error) {
                  //TODO IMPLEMENT
                }
              });
            }

            if (error) {
              //TODO IMPLEMENT
            }
          }
        );
      }
    }
  }, [status]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg_color p-7">
      <div className="flex flex-col">
        <Lottie animationData={animation} loop className="mx-auto mb-3 h-[30%] w-[30%]" />

        <h1 className="mb-2 text-center text-xl font-semibold">{title}</h1>

        <p className="mb-2 text-center">{subtitle}</p>

        <Link onClick={linkAction} className="self-center">
          {linkTitle}
        </Link>
      </div>
    </div>
  );
};
