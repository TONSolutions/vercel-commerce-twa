"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import { BackButton } from "@twa-dev/sdk/react";
import { CheckoutItems } from "components/checkout/components/CheckoutItems";
import { Option } from "components/checkout/components/Option";
import { TotalSection } from "components/checkout/components/TotalSection";
import { useCartDataConductor } from "contexts/CartContext";
import { useWebAppDataConductor } from "contexts/WebAppContext";
import { truncateMiddle } from "lib/utils";
import Link from "next/link";
import { useEffect, type FunctionComponent } from "react";

/*
When opened, create a draft order. 
 Set there location, user wallet, name.
 Add delivery info to Draft object in custom field

*/

export const CheckoutPage: FunctionComponent = () => {
  const { cart, total } = useCartDataConductor();
  const {
    initDataUnsafe: { user },
    MainButton
  } = useWebAppDataConductor();

  const address = useTonAddress();
  const truncatedAddress = truncateMiddle(address);
  const userName = `${user?.first_name} ${user?.last_name}`;

  const handleCheckout = () => {
    //TODO add
    console.log("triggered");
  };

  console.log(cart);

  useEffect(() => {
    MainButton.setText(`Pay ${total} TON`);
    MainButton.onClick(handleCheckout);

    return () => MainButton.offClick(handleCheckout);
  }, []);

  if (!cart) {
    return null;
  }

  return (
    <div className="px-4 pt-6">
      <BackButton />

      <div className="mb-6">
        <h1 className="mb-3 text-xl font-bold">Checkout</h1>

        <div className="divide-y divide-[#C8C7CB] rounded-xl bg-bg_color px-4 py-3">
          <CheckoutItems />

          <TotalSection />
        </div>
      </div>

      <div className="rounded-xl bg-bg_color px-4 py-3">
        <Link href="/checkout/edit" className="divide-y divide-[#C8C7CB]">
          <Option title="Payment Method" option={truncatedAddress} />

          <Option title="Shipping information" option="ADDRESS" clickable />

          <Option title="Name" option={userName} clickable />

          <Option title="Phone" option="" clickable />
        </Link>
      </div>
    </div>
  );
};
