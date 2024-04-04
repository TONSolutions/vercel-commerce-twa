import { CheckoutItem } from "components/checkout/components/CheckoutItem";

import type { DraftOrderLineItem } from "lib/shopify/admin/types";
import type { FunctionComponent } from "react";

type Props = {
  items: DraftOrderLineItem[];
};

export const CheckoutItems: FunctionComponent<Props> = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {items.map(({ quantity, title, variantTitle, product, originalTotal }, index) => {
        const url = product?.featuredImage?.url ?? "";

        const options = (variantTitle + ` / x${quantity}`).replaceAll(
          "/",
          String.fromCharCode(183)
        );

        return (
          <CheckoutItem
            key={index}
            imageUrl={url}
            title={title}
            options={options}
            price={originalTotal ?? ""}
          />
        );
      })}
    </div>
  );
};
