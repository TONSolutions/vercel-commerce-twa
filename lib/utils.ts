import { DEFAULT_FORM_VALUES } from "components/constants";

import type { CheckoutForm } from "components/types";
import type { CustomAttribute } from "lib/shopify/admin/types";
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
    try {
      if (window?.Telegram?.WebApp?.version === "6.0") {
        console.error("Cloud storage is not available");

        return;
      }

      window.Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
        if (error) {
          return reject(error);
        } else {
          resolve(value);
        }
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
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

export const prepareShopifyIdForUrl = (id: string, resource = "Cart") =>
  id.replace(`gid://shopify/${resource}/`, "/");

export const prepareShopifyIdForRequest = (id: string, resource = "Cart") =>
  id.replace("/", `gid://shopify/${resource}/`);

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

export const mapCustomAttributesToFormValues = (customAttributes: CustomAttribute[]) =>
  customAttributes.reduce<CheckoutForm>((acc, curr) => {
    const { key, value } = curr;

    return { ...acc, [key]: { value, changed: false } };
  }, DEFAULT_FORM_VALUES);

export const mapFormValuesToCustomAttributes = (formValues: CheckoutForm) =>
  Object.entries(formValues).map<CustomAttribute>(([k, v]) => ({ key: k, value: v.value }));

export function openLink(href: string, target = "_self"): void {
  window.open(href, target, "noopener noreferrer");
}

export const getDeliveryDate = () => {
  const currentDateObj = new Date();

  currentDateObj.setDate(currentDateObj.getDate() + 7);

  return currentDateObj.toISOString();
};

export const formatDateToLocalString = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
