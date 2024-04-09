/* eslint-disable max-lines */
"use client";

import { BackButton } from "@twa-dev/sdk/react";
import { getDraftOrderById, updateDraftOrder } from "components/checkout/actions";
import { ListWithTitle } from "components/checkout/ui/ListWithTitle";
import { Routes } from "components/constants";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { ListInput, ListItem, Radio } from "konsta/react";
import { getValueFromTelegramCloudStorage } from "lib/utils";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FunctionComponent
} from "react";

import type { DraftOrderInput } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";

type Props = {
  locations: ShopifyLocation[];
};

const DEFAULT_FORM_VALUES = {
  shippingInformation: { value: "", changed: false },
  phone: { value: "", changed: false }, //TODO we should transmit hash, not real numbers
  name: { value: "", changed: false }
};

type FormInput = { value: string; changed: boolean };
type CheckoutForm = { shippingInformation: FormInput; phone: FormInput; name: FormInput };

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
        customAttributes: Object.entries(form).map(([k, v]) => ({ key: k, value: v.value }))
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
          const formValues = customAttributes.reduce<CheckoutForm>((acc, curr) => {
            const { key, value } = curr;

            return { ...acc, [key]: { value, changed: false } };
          }, DEFAULT_FORM_VALUES);

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

      <div>
        <ListWithTitle title="Choose pick-up point">
          {locations.map(({ address }, index) => (
            <ListItem
              key={index}
              label
              title={`${address.city}, ${address.countryCode}`}
              subtitle={`${address.city}, ${address.country}, ${address.address1}`}
              media={
                <Radio
                  component="div"
                  checked={
                    `${address.city}, ${address.countryCode}` === form.shippingInformation.value
                  }
                  name="shippingInformation"
                  value={`${address.city}, ${address.countryCode}`}
                  disabled={isPending}
                  onChange={handleSetForm}
                />
              }
            />
          ))}
        </ListWithTitle>

        {/* TODO move to ui component HintText */}
        <p className="mx-4 px-4 text-sm text-[#6D6D72]">
          Now in our store, delivery is available only to the pick-up point. In the near future, the
          options will be more.
        </p>
      </div>

      <div>
        <ListWithTitle title="Receiver">
          <ListInput
            type="text"
            placeholder="Your name"
            min={2}
            name="name"
            value={form.name.value}
            disabled={isPending}
            onChange={handleSetForm}
          />

          <ListInput
            type="text"
            placeholder="Your phone"
            accept="number"
            name="phone"
            value={form.phone.value}
            disabled={isPending}
            onChange={handleSetForm}
            error={
              form.phone.changed && !form.phone.value.match(/^[0-9]+$/)
                ? "Please remove extra characters and leave only the digits"
                : ""
            }
          />
        </ListWithTitle>
      </div>
    </div>
  );
};
