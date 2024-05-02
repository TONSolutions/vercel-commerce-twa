"use client";
import { useTonAddress } from "@tonconnect/ui-react";
import { clearCart } from "components/cart/actions";
import { markOrderAsPaid } from "components/checkout/actions";
import { AnimationPage } from "components/common/components/AnimationPage";
import { ProcessingStatus } from "components/constants";
import { useGetCheckoutStatusContent } from "components/hooks/useGetCheckoutStatusContent";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { pollTransactionStatus } from "lib/pollTransactionStatus";
import {
  getValueFromTelegramCloudStorage,
  prepareShopifyIdForRequest,
  setValueFromTelegramCloudStorage
} from "lib/utils";
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
        clearCart(prepareShopifyIdForRequest(cartId), itemIds).then(
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
    <AnimationPage
      wrapperClassName="bg-color"
      title={title}
      subtitle={subtitle}
      animation={animation}
      linkTitle={linkTitle}
      linkAction={linkAction}
    />
  );
};
