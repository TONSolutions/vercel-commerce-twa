import type { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_STOREFRONT_ACCESS_TOKEN"];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
  ) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them."
    );
  }
};

export const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  return (
    userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("macintosh")
  );
};

export async function getValueFromTelegramCloudStorage(key: string) {
  return new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}

export function setValueFromTelegramCloudStorage(key: string, value: string) {
  return new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.setItem(key, value, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(key);
      }
    });
  });
}

export const prepareCartIdForUrl = (cartId: string) => cartId.replace("gid://shopify/Cart/", "/");

export const prepareCartIdForRequest = (cartId: string) =>
  cartId.replace("/", "gid://shopify/Cart/");

export const truncateMiddle = (input: string) => {
  const middleLength = input.length - 10;

  const modifiedString =
    input.slice(0, 5) + "...".repeat(middleLength > 0 ? 1 : 0) + input.slice(-5);

  return modifiedString;
};

export const createReserveTimestamp = (minutes: number) => {
  const currentDate: Date = new Date();

  const futureDate: Date = new Date(currentDate.getTime() + minutes * 60000);

  const iso8601DateTime: string = futureDate.toISOString();

  return iso8601DateTime;
};

export const isReserveValid = (reservedUntil: string) => {
  const reservedUntilDate = new Date(reservedUntil);
  const currentDate = new Date();

  if (reservedUntilDate < currentDate) {
    return false;
  } else {
    return true;
  }
};
