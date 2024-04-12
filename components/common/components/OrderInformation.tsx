import classNames from "classnames";
import { CheckoutItems } from "components/checkout/components/CheckoutItems";
import { TotalSection } from "components/checkout/components/TotalSection";
import { List, ListItem } from "konsta/react";
import { truncateMiddle } from "lib/utils";

import type { LineItem } from "lib/shopify/admin/types";
import type { FunctionComponent } from "react";

type FieldsDisableStatus = { name: boolean; phone: boolean; shippingInformation: boolean };

type Props = {
  name: string;
  phone: string;
  lineItems: LineItem[];
  walletAddress: string;
  title: string;
  address: string;
  linkHref: string;
  orderDate?: string;
  total: string;
  disabledFields?: FieldsDisableStatus;
};

export const OrderInformation: FunctionComponent<Props> = ({
  name,
  phone,
  lineItems,
  walletAddress,
  address,
  title,
  linkHref,
  orderDate,
  total,
  disabledFields = { name: false, phone: false, shippingInformation: false }
}) => {
  const disabledStyles = "pointer-events-none cursor-not-allowed opacity-50";

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-3 px-4 text-xl font-bold">{title}</h1>

        {orderDate ? <span className="text-[#8E8E93]">{orderDate}</span> : null}
      </div>

      <div className="m-4 rounded-xl bg-bg_color">
        <CheckoutItems items={lineItems} />

        <TotalSection total={total} />
      </div>

      <List className="m-4 rounded-xl bg-bg_color" strongIos>
        <ListItem title="Payment Method" after={truncateMiddle(walletAddress)} />

        <ListItem
          link
          href={linkHref}
          title="Shipping information"
          className={classNames({ [disabledStyles]: disabledFields.shippingInformation })}
          after={address}
        />

        <ListItem
          link
          href={linkHref}
          title="Name"
          className={classNames({ [disabledStyles]: disabledFields.name })}
          after={name}
        />

        <ListItem
          link
          href={linkHref}
          title="Phone"
          className={classNames({ [disabledStyles]: disabledFields.phone })}
          after={phone}
        />
      </List>
    </>
  );
};
