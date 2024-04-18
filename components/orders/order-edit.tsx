/* eslint-disable prettier/prettier */
"use client";
import { BackButton } from "@twa-dev/sdk/react";
import { CheckoutPageShimmer } from "components/checkout/components/Shimmer/CheckoutPageShimmer";
import { OrderInformationEdit } from "components/common/components/OrderInformationEdit";
import { DEFAULT_FORM_VALUES, Routes } from "components/constants";
import { updateOrder } from "components/orders/actions";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { mapCustomAttributesToFormValues, mapFormValuesToCustomAttributes, prepareShopifyIdForUrl } from "lib/utils";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FunctionComponent
} from "react";

import type { CheckoutForm } from "components/types";
import type { CustomAttribute, OrderInput } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";

type Props = {
  orderId: string;
  customAttributes: CustomAttribute[];
  locations: ShopifyLocation[];
};

export const EditOrderPage: FunctionComponent<Props> = ({
  customAttributes,
  orderId,
  locations
}) => {
  const { MainButton } = useWebAppDataConductor();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<CheckoutForm>(DEFAULT_FORM_VALUES);

  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      const formValues = mapCustomAttributesToFormValues(customAttributes);

      setForm(formValues);
    });
  }, []);

  const handleSetForm = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const field = event.target.name;
    const value = event.target.value;

    setForm((form) => ({ ...form, [field]: { changed: true, value } }));
  };

    const handleUpdateOrder = () => {
        startTransition(async () => {

            const values: OrderInput = {
                id: orderId,
                customAttributes: mapFormValuesToCustomAttributes(form)
            };

            updateOrder(values).then(({ success, error }) => {
                if (success) {
                    router.push(Routes.Order.replace("/:id", prepareShopifyIdForUrl(orderId, "Order")));
                }

                if (error) {
                    //TODO error handling
                }
            });
        });
    };

  useEffect(() => {
    MainButton.show();
    MainButton.setText("Done");
    MainButton.color = "#007AFF";
    MainButton.textColor = "#FFF";
    MainButton.onClick(handleUpdateOrder);

    return () => MainButton.offClick(handleUpdateOrder);
  }, [form.name.value, form.phone.value, form.shippingInformation.value]);

  if (isPending) {
    return <CheckoutPageShimmer title="" />;
  }

  return (
    <div className="flex flex-col gap-6 pt-6">
      <BackButton />

      <OrderInformationEdit
        form={form}
        disabled={isPending}
        locations={locations}
        onChange={handleSetForm}
      />
    </div>
  );
};
