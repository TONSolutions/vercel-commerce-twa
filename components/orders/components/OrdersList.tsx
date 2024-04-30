import classNames from "classnames";
import animation from "components/assets/animations/duck_surprised.json";
import { AnimationPage } from "components/common/components/AnimationPage";
import { Routes } from "components/constants";
import { useTheme } from "components/hooks/useTheme";
import { OrderListItem } from "components/orders/components/OrderListItem";
import { OrderStatus, OrderType } from "components/orders/constants";
import { getAddress } from "components/orders/utils";
import { useRouter } from "next/navigation";

import type { Order } from "lib/shopify/admin/types";
import type { ShopifyLocation } from "lib/shopify/storefront/types";
import type { FunctionComponent } from "react";

type Props = { orders: Order[]; type: OrderType; locations: ShopifyLocation[] };

export const OrdersList: FunctionComponent<Props> = ({ orders, type, locations }) => {
  const router = useRouter();
  const { hint_color } = useTheme();

  const linkAction = () => {
    router.push(Routes.Main);
  };

  if (!orders.length) {
    return (
      <AnimationPage
        title={
          type === OrderType.Active ? "You have no active orders" : "You have no finished orders"
        }
        subtitle="Explore our new products and bestsellers in the catalog."
        linkTitle="Go to catalog"
        linkAction={linkAction}
        animation={animation}
        wrapperClassName="!min-h-[unset]" //TODO fix
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {orders.map((order, index) => {
          const {
            customAttributes,
            subtotalLineItemsQuantity: quantity,
            id,
            name,
            tags,
            displayFulfillmentStatus,
            updatedAt,
            lineItems
          } = order;

          const deliveryEstimationDate = customAttributes.find(
            (item) => item.key === "deliveryEstimation"
          )?.value;

          const address = getAddress({ type, locations, customAttributes });

          const status =
            tags.includes("Ready for pickup") && displayFulfillmentStatus === "UNFULFILLED"
              ? OrderStatus.Ready
              : OrderStatus.Created;

          const images = lineItems.map(({ product }) => product?.featuredImage.url ?? "");

          const deliveryDate = new Date(updatedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });

          return (
            <OrderListItem
              id={id}
              key={index}
              quantity={quantity}
              deliveryEstimationDate={deliveryEstimationDate}
              name={name}
              type={type}
              status={status}
              address={address}
              deliveryDate={deliveryDate}
              images={images}
            />
          );
        })}
      </div>

      {type === OrderType.Active ? (
        <p className={classNames("text-sm", hint_color)}>
          When the order is ready for pickup, we will send a notification to you in chat.
        </p>
      ) : null}
    </>
  );
};
