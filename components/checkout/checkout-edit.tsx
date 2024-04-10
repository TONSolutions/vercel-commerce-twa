/* eslint-disable max-lines */
"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { getDraftOrderById, updateDraftOrder } from "components/checkout/actions";
import { OrderInformationEdit } from "components/common/components/OrderInformationEdit";
import { DEFAULT_FORM_VALUES, Routes } from "components/constants";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import {
  getValueFromTelegramCloudStorage,
  mapCustomAttributesToFormValues,
  mapFormValuesToCustomAttributes
} from "lib/utils";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FunctionComponent
} from "react";

import type { CheckoutForm } from "components/types";
import type { DraftOrderInput } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";

type Props = {
  locations: ShopifyLocation[];
};

export const CheckoutEditPage: FunctionComponent<Props> = ({ locations }) => {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<CheckoutForm>(DEFAULT_FORM_VALUES);
  const { MainButton } = useWebAppDataConductor();

  const router = useRouter();

  const handleSetForm = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const field = event.target.name;
    const value = event.target.value;

    setForm((form) => ({ ...form, [field]: { changed: true, value } }));
  };

  const handleUpdateDraftOrder = () => {
    startTransition(async () => {
      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      const values: DraftOrderInput = {
        customAttributes: mapFormValuesToCustomAttributes(form)
      };

      updateDraftOrder(values, draftOrderId).then(({ success, error }) => {
        if (success) {
          router.push(Routes.Checkout);
        }

        if (error) {
          //TODO error handling
        }
      });
    });
  };

  useEffect(() => {
    startTransition(async () => {
      const draftOrderId = (await getValueFromTelegramCloudStorage("draftOrderId")) as string;

      getDraftOrderById(draftOrderId).then(({ data, success, error }) => {
        if (success) {
          const customAttributes = data.customAttributes;
          const formValues = mapCustomAttributesToFormValues(customAttributes);

          setForm(formValues);
        }

        if (error) {
          // TODO ADD
        }
      });
    });
  }, []);

  useEffect(() => {
    MainButton.show();
    MainButton.setText("Done");
    MainButton.color = "#007AFF";
    MainButton.textColor = "#FFF";
    MainButton.onClick(handleUpdateDraftOrder);

    return () => MainButton.offClick(handleUpdateDraftOrder);
  }, [form.name.value, form.phone.value, form.shippingInformation.value]);

  if (isPending) {
    return <h1>Loading...</h1>;
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
