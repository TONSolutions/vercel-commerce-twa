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
      {items.map(({ quantity, name: combinedTitle, product, originalTotal }, index) => {
        const [title, sizeColorTitle] = combinedTitle.split(" - ");

        const url = product?.featuredImage?.url ?? "";

        const options = (sizeColorTitle + ` / x${quantity}`).replaceAll(
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
