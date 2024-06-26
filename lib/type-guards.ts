export interface ShopifyErrorLike {
  status: number;
  message: Error;
  cause?: Error;
}

export const isObject = (object: unknown): object is Record<string, unknown> =>
  typeof object === "object" && object !== null && !Array.isArray(object);

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
  if (!isObject(error)) {
    return false;
  }

  if (error instanceof Error) {
    return findError(error);
  }

  return false;
};

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === "[object Error]") {
    return true;
  }

  const prototype = Object.getPrototypeOf(error) as T | null;

  return prototype === null ? false : findError(prototype);
}
