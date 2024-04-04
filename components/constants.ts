export enum Routes {
  Checkout = "/checkout",
  CheckoutProcessing = "/checkout/processing",
  Cart = "/cart",
  CartItems = "/cart/items",
  Main = "/",
  Orders = "/orders"
}

export enum ProcessingStatus {
  NotStarted = "not_started",
  Started = "started",
  Success = "success",
  Error = "error"
}

export const NANOTONS_IN_TON = 1000000000;
export const FEE = 0.01;
