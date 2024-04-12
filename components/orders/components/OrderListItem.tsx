import CaretRightIcon from "components/assets/icons/CaretRightIcon";
import { Routes } from "components/constants";
import { ImageStack } from "components/orders/components/ImageStack";
import { StatusBar } from "components/orders/components/StatusBar";
import { OrderType } from "components/orders/constants";
import { getContentByStatusAndType } from "components/orders/utils";
import { Card } from "konsta/react";
import { prepareShopifyIdForUrl } from "lib/utils";
import Link from "next/link";

import type { OrderStatus } from "components/orders/constants";
import type { FunctionComponent } from "react";

type Props = {
  id: string;
  name: string;
  quantity: number;
  deliveryDate: string;
  address: string;
  type: OrderType;
  status: OrderStatus;
  images: string[];
  deliveryEstimationDate?: string;
};

export const OrderListItem: FunctionComponent<Props> = ({
  id,
  name,
  deliveryEstimationDate,
  deliveryDate,
  address,
  type,
  status,
  quantity,
  images
}) => {
  const itemForm = quantity === 1 ? "item" : "items";

  const headerText = `${name} ${String.fromCharCode(183)} ${quantity} ${itemForm}`;

  const { title, subtitle } = getContentByStatusAndType({
    type,
    status,
    deliveryDate,
    deliveryEstimationDate,
    address
  });

  return (
    <Link href={Routes.Order.replace("/:id", prepareShopifyIdForUrl(id, "Order"))}>
      <Card className="mx-0">
        <span className="text-sm text-[#6D6D72]">{headerText}</span>

        <div className="flex justify-between py-2">
          <div className="flex">
            <ImageStack images={images} />

            {title && subtitle ? (
              <div>
                <p className="text-lg font-medium">{title}</p>

                <span className="text-sm text-[#8E8E93]">{subtitle}</span>
              </div>
            ) : null}
          </div>

          <CaretRightIcon className="h-3 w-2 self-center" />
        </div>

        {type === OrderType.Active ? <StatusBar status={status} /> : null}
      </Card>
    </Link>
  );
};
