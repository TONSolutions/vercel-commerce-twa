import type { OrderType } from "components/orders/constants";
import type { Order } from "lib/shopify/admin/types";

export type MappedOrders = {
  [OrderType.Active]: Order[];
  [OrderType.Finished]: Order[];
};
