"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { Option } from "components/checkout/components/Option";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { truncateMiddle } from "lib/utils";
import Link from "next/link";
import { type FunctionComponent } from "react";

import type { Location } from "lib/shopify/types";

/*
When opened, create a draft order. 
 Set there location, user wallet, name.
Don't forget Main Button
*/

type Props = {
  locations: Location[];
};

export const CheckoutPage: FunctionComponent<Props> = ({ locations }) => {
  const { cart, total } = useCartDataConductor();
  const {
    initDataUnsafe: { user }
  } = useWebAppDataConductor();

  const address = useTonAddress();
  const truncatedAddress = truncateMiddle(address);
  const userName = `${user?.first_name} ${user?.last_name}`;
  const shipmentAddress = `${locations[0].address.city}, ${locations[0].address.countryCode}`;

  if (!cart) {
    return null;
  }

  const { lines } = cart;

  return (
    <div className="px-4 pt-6">
      <BackButton />

      <div className="mb-6">
        <h1 className="mb-3 text-xl font-bold">Checkout</h1>

        <div className="divide-y divide-[#C8C7CB] rounded-xl bg-bg_color px-4 py-3">
          <div className="flex flex-col">
            {lines.map(({ merchandise, quantity, cost }, index) => {
              const {
                totalAmount: { amount: price }
              } = cost;

              const {
                product: {
                  featuredImage: { url },
                  title
                },
                title: sizeColorTitle
              } = merchandise;

              const options = (sizeColorTitle + ` / x${quantity}`).replaceAll(
                "/",
                String.fromCharCode(183)
              );

              return (
                <div key={index} className="mb-4 flex justify-between gap-3">
                  <div className="flex w-full max-w-[75%] ">
                    <img src={url} className="mr-2 h-10 w-10 rounded-xl" />

                    <div className="flex w-full max-w-[85%] flex-col">
                      <p className="truncate">{title}</p>

                      <span className="text-sm text-hint_color">{options}</span>
                    </div>
                  </div>

                  <span className="self-center text-hint_color">{`${price} TON`}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 text-xl font-semibold">
            <span>Total price</span>

            <span>{total}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-bg_color px-4 py-3">
        <Link href="/checkout/edit" className="divide-y divide-[#C8C7CB]">
          <Option title="Payment Method" option={truncatedAddress} />

          <Option title="Shipping information" option={shipmentAddress} clickable />

          <Option title="Name" option={userName} clickable />

          <Option title="Phone" option="" clickable />
        </Link>
      </div>
    </div>
  );
};
