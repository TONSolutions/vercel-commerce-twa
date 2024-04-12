export enum Routes {
  Checkout = "/checkout",
  CheckoutEdit = "/checkout/edit",
  CheckoutProcessing = "/checkout/processing/:amount",
  Cart = "/cart",
  CartItems = "/cart/items",
  Main = "/",
  Orders = "/orders",
  Order = "/orders/:id",
  OrderEdit = "/orders/:id/edit"
}

export enum ProcessingStatus {
  NotStarted = "not_started",
  Processing = "processing",
  Success = "success",
  Error = "error"
}

export const NANOTONS_IN_TON = 1000000000;
export const FEE = 0.01;

export const DEFAULT_FORM_VALUES = {
  shippingInformation: { value: "", changed: false },
  phone: { value: "", changed: false }, //TODO we should transmit hash, not real numbers
  name: { value: "", changed: false }
};

export const BANNER_KEY = "banner";
