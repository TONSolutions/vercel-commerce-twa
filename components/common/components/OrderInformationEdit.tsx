import { ListWithTitle } from "components/checkout/ui/ListWithTitle";
import { HintText } from "components/common/ui/HintText";
import { ListInput, ListItem, Radio } from "konsta/react";

import type { CheckoutForm } from "components/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";
import type { ChangeEvent, FunctionComponent } from "react";

type Props = {
  form: CheckoutForm;
  locations: ShopifyLocation[];
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const OrderInformationEdit: FunctionComponent<Props> = ({
  form,
  locations,
  disabled,
  onChange
}) => (
  <>
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
                disabled={disabled}
                onChange={onChange}
              />
            }
          />
        ))}
      </ListWithTitle>

      <HintText>
        Now in our store, delivery is available only to the pick-up point. In the near future, the
        options will be more.
      </HintText>
    </div>

    <div>
      <ListWithTitle title="Receiver">
        <ListInput
          type="text"
          placeholder="Your name"
          min={2}
          name="name"
          value={form.name.value}
          disabled={disabled}
          onChange={onChange}
        />

        <ListInput
          type="text"
          placeholder="Your phone"
          accept="number"
          name="phone"
          value={form.phone.value}
          disabled={disabled}
          onChange={onChange}
          error={
            form.phone.changed && !form.phone.value.match(/^[0-9]+$/)
              ? "Please remove extra characters and leave only the digits"
              : ""
          }
        />
      </ListWithTitle>
    </div>
  </>
);
