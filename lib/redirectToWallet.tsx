/* eslint-disable no-console */
import { encodeTelegramUrlParameters, isTelegramUrl } from "@tonconnect/sdk";
import { TonConnectError } from "@tonconnect/ui-react";
import UAParser from "ua-parser-js";

import type { ReturnStrategy } from "@tonconnect/ui-react";

interface UserAgent {
  os: "ios" | "ipad" | "android" | "macos" | "windows" | "linux" | undefined;
  browser: "chrome" | "firefox" | "safari" | "opera" | undefined;
}

class TonConnectUIError extends TonConnectError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);

    Object.setPrototypeOf(this, TonConnectUIError.prototype);
  }
}

function getUserAgent(): UserAgent {
  const results = new UAParser().getResult();
  const osName = results.os.name?.toLowerCase();
  const deviceModel = results.device.model?.toLowerCase();
  let os: UserAgent["os"];

  switch (true) {
    case deviceModel === "ipad":
      os = "ipad";
      break;
    case osName === "ios":
      os = "ios";
      break;
    case osName === "android":
      os = "android";
      break;
    case osName === "mac os":
      os = "macos";
      break;
    case osName === "linux":
      os = "linux";
      break;
    case osName?.includes("windows"):
      os = "windows";
      break;
  }

  const browserName = results.browser.name?.toLowerCase();
  let browser: UserAgent["browser"] | undefined;

  switch (true) {
    case browserName === "chrome":
      browser = "chrome";
      break;
    case browserName === "firefox":
      browser = "firefox";
      break;
    case browserName?.includes("safari"):
      browser = "safari";
      break;
    case browserName?.includes("opera"):
      browser = "opera";
      break;
  }

  return {
    os,
    browser
  };
}

function isOS(...os: UserAgent["os"][]): boolean {
  return os.includes(getUserAgent().os);
}

function isBrowser(...browser: UserAgent["browser"][]): boolean {
  return browser.includes(getUserAgent().browser);
}

function getWindow(): Window | undefined {
  if (typeof window !== "undefined") {
    return window;
  }

  return undefined;
}

function openLink(href: string, target = "_self"): void {
  window.open(href, target, "noopener noreferrer");
}

/**
 * Opens a link in a new tab.
 * @param href
 */
function openLinkBlank(href: string): void {
  openLink(href, "_blank");
}

type TmaPlatform =
  | "android"
  | "ios"
  | "macos"
  | "tdesktop"
  | "weba"
  | "webk"
  | "unigram"
  | "web"
  | "unknown"
  | "android_x";

let initParams: Record<string, string> = {};

try {
  const locationHash = location.hash.toString();
  initParams = urlParseHashParams(locationHash);
} catch (e) {
  console.log(e);
}

let tmaPlatform: TmaPlatform = "unknown";

if (initParams?.tgWebAppPlatform) {
  tmaPlatform = (initParams.tgWebAppPlatform as TmaPlatform) ?? "unknown";
}

if (tmaPlatform === "unknown") {
  const window = getWindow();
  tmaPlatform = window?.Telegram?.WebApp?.platform ?? "unknown";
}

let webAppVersion = "6.0";

if (initParams?.tgWebAppVersion) {
  webAppVersion = initParams.tgWebAppVersion;
}

if (!webAppVersion) {
  const window = getWindow();
  webAppVersion = window?.Telegram?.WebApp?.version ?? "6.0";
}

/**
 * Returns true if the app is running in TMA on the specified platform.
 * @param platforms
 */
function isTmaPlatform(...platforms: TmaPlatform[]): boolean {
  return platforms.includes(tmaPlatform);
}

/**
 * Opens link in TMA or in new tab and returns a function that closes the tab.
 * @param link The link to open.
 * @param fallback The function to call if the link can't be opened in TMA.
 */
function sendOpenTelegramLink(link: string, fallback?: () => void): void {
  const url = new URL(link);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    if (fallback) {
      return fallback();
    }

    throw new TonConnectUIError(`Url protocol is not supported: ${url}`);
  }

  if (url.hostname !== "t.me") {
    if (fallback) {
      return fallback();
    }

    throw new TonConnectUIError(`Url host is not supported: ${url}`);
  }

  const pathFull = url.pathname + url.search;

  if (isIframe() || versionAtLeast("6.1")) {
    postEvent("web_app_open_tg_link", { path_full: pathFull });
  } else {
    openLinkBlank("https://t.me" + pathFull);
  }
}

function isIframe(): boolean {
  try {
    const window = getWindow();

    if (!window) {
      return false;
    }

    return window.parent != null && window !== window.parent;
  } catch (e) {
    return false;
  }
}

function postEvent(eventType: "web_app_open_tg_link", eventData: { path_full: string }): void;
function postEvent(eventType: "web_app_expand", eventData: object): void;
function postEvent(eventType: string, eventData: object): void {
  try {
    const window = getWindow();

    if (!window) {
      throw new TonConnectUIError(`Can't post event to parent window: window is not defined`);
    }

    if (window.TelegramWebviewProxy !== undefined) {
      window.TelegramWebviewProxy.postEvent(eventType, JSON.stringify(eventData));
    } else if (window.external && "notify" in window.external) {
      window.external.notify(JSON.stringify({ eventType: eventType, eventData: eventData }));
    } else if (isIframe()) {
      const trustedTarget = "*";
      const message = JSON.stringify({ eventType: eventType, eventData: eventData });
      window.parent.postMessage(message, trustedTarget);
    } else {
      throw new TonConnectUIError(`Can't post event to TMA`);
    }
  } catch (e) {
    console.error(e);
  }
}

function urlParseHashParams(locationHash: string): Record<string, string> {
  locationHash = locationHash.replace(/^#/, "");
  const params: Record<string, string> = {};

  if (!locationHash.length) {
    return params;
  }

  if (locationHash.indexOf("=") < 0 && locationHash.indexOf("?") < 0) {
    params._path = urlSafeDecode(locationHash);

    return params;
  }

  const qIndex = locationHash.indexOf("?");

  if (qIndex >= 0) {
    const pathParam = locationHash.substr(0, qIndex);
    params._path = urlSafeDecode(pathParam);
    locationHash = locationHash.substr(qIndex + 1);
  }

  const query_params = urlParseQueryString(locationHash);

  for (const k in query_params) {
    params[k] = query_params[k]!;
  }

  return params;
}

function urlSafeDecode(urlencoded: string): string {
  try {
    urlencoded = urlencoded.replace(/\+/g, "%20");

    return decodeURIComponent(urlencoded);
  } catch (e) {
    return urlencoded;
  }
}

function urlParseQueryString(queryString: string): Record<string, string | null> {
  const params: Record<string, string | null> = {};

  if (!queryString.length) {
    return params;
  }

  const queryStringParams = queryString.split("&");
  let i, param, paramName, paramValue;

  for (i = 0; i < queryStringParams.length; i++) {
    param = queryStringParams[i]!.split("=");
    paramName = urlSafeDecode(param[0]!);
    paramValue = param[1] == null ? null : urlSafeDecode(param[1]);
    params[paramName] = paramValue;
  }

  return params;
}

function versionCompare(v1: string | undefined, v2: string | undefined): 0 | 1 | -1 {
  if (typeof v1 !== "string") {
    v1 = "";
  }

  if (typeof v2 !== "string") {
    v2 = "";
  }

  const v1List = v1.replace(/^\s+|\s+$/g, "").split(".");
  const v2List = v2.replace(/^\s+|\s+$/g, "").split(".");
  const a = Math.max(v1List.length, v2List.length);

  let i, p1, p2;

  for (i = 0; i < a; i++) {
    p1 = parseInt(v1List[i]!) || 0;
    p2 = parseInt(v2List[i]!) || 0;

    if (p1 === p2) {
      continue;
    }

    if (p1 > p2) {
      return 1;
    }

    return -1;
  }

  return 0;
}

function versionAtLeast(ver: string): boolean {
  return versionCompare(webAppVersion, ver) >= 0;
}

function isInTMA(): boolean {
  return (
    tmaPlatform !== "unknown" ||
    !!(getWindow() as { TelegramWebviewProxy: unknown } | undefined)?.TelegramWebviewProxy
  );
}

/**
 * Adds a return strategy to a url.
 * @param url
 * @param strategy
 * TODO: refactor this method
 */
function addReturnStrategy(
  url: string,
  strategy:
    | ReturnStrategy
    | {
        returnStrategy: ReturnStrategy;
        twaReturnUrl: `${string}://${string}` | undefined;
      }
): string {
  let returnStrategy;

  if (typeof strategy === "string") {
    returnStrategy = strategy;
  } else {
    returnStrategy = isInTMA() ? strategy.twaReturnUrl || strategy.returnStrategy : "none";
  }

  const newUrl = addQueryParameter(url, "ret", returnStrategy);

  if (!isTelegramUrl(url)) {
    return newUrl;
  }

  const lastParam = newUrl.slice(newUrl.lastIndexOf("&") + 1);

  return newUrl.slice(0, newUrl.lastIndexOf("&")) + "-" + encodeTelegramUrlParameters(lastParam);
}

/**
 * Open a deeplink in the same tab and fallback to a direct link after 200 ms.
 * In Safari, the fallback will not work.
 * @param href
 * @param fallback
 */
function openDeeplinkWithFallback(href: string, fallback: () => void): void {
  const doFallback = (): void => {
    if (isBrowser("safari") || (isOS("android") && isBrowser("firefox"))) {
      // Safari does not support fallback to direct link.
      return;
    }

    fallback();
  };

  const fallbackTimeout = setTimeout(() => doFallback(), 200);
  window.addEventListener("blur", () => clearTimeout(fallbackTimeout), { once: true });

  openLink(href, "_self");
}

/**
 * Convert universal link to the given deeplink: replace protocol and path, but keep query params
 * @param universalLink
 * @param deeplink
 */
export function toDeeplink(universalLink: string, deeplink: string): string {
  const url = new URL(universalLink);

  return deeplink + url.search;
}

//Copied this func directly from SDK as it was not exposed. Need to be properly adapted;

/**
 * Redirects the user to a specified wallet link with various strategies for returning to the application.
 * This function is primarily used for any wallet (except TON Space) to handle different platforms and operating systems.
 *
 * @param universalLink A string representing the universal link to redirect to within the wallet.
 * @param deepLink A string representing the deep link to redirect to within the wallet, or `undefined` if not applicable.
 * @param options An object containing specific properties to customize the redirect behavior:
 *  - returnStrategy: An enum `ReturnStrategy` dictating the method for returning to the app after the action is completed.
 *  - forceRedirect: A boolean flag to force redirection, bypassing deep link fallback mechanisms.
 * @param setOpenMethod A function to set the method of opening the wallet.
 *
 * The function adapts its behavior based on the execution context, such as the TMA or browser environment, and the operating system.
 * Different strategies involve manipulating URL parameters and utilizing platform-specific features for optimal user experience.
 */
export function redirectToWallet(
  universalLink: string,
  deepLink: string | undefined,
  options: {
    returnStrategy: ReturnStrategy;
    forceRedirect: boolean;
  }
): void {
  options = { ...options };

  if (isInTMA()) {
    if (isTmaPlatform("ios", "android")) {
      // Use the `tg://resolve` strategy instead of `back`, the user will transition to the other app
      // and return to the Telegram app after the action is completed.

      // return back to the telegram app
      if (options.returnStrategy === "back") {
        options.returnStrategy = "tg://resolve";
      }

      const linkWitStrategy = addReturnStrategy(universalLink, options.returnStrategy);

      sendOpenTelegramLink(linkWitStrategy, () => {
        openLinkBlank(linkWitStrategy);
      });
    } else if (isTmaPlatform("macos", "tdesktop")) {
      // Use the `tg://resolve` strategy instead of `back`, the user will transition to the other app
      // and return to the Telegram app after the action is completed.

      // return back to the telegram app
      if (options.returnStrategy === "back") {
        options.returnStrategy = "tg://resolve";
      }

      const linkWitStrategy = addReturnStrategy(universalLink, options.returnStrategy);
      const useDeepLink = !!deepLink && !options.forceRedirect;

      // In case of deep link, use the `custom-deeplink` strategy with fallback to `universal-link`.
      if (useDeepLink) {
        openDeeplinkWithFallback(toDeeplink(linkWitStrategy, deepLink), () => {
          openLinkBlank(linkWitStrategy);
        });
      } else {
        openLinkBlank(linkWitStrategy);
      }
    } else if (isTmaPlatform("weba")) {
      // Use the `back` strategy, the user will transition to the other app
      // and maybe return to the browser when the action is completed.

      // return back to the browser
      if (options.returnStrategy === "back") {
        if (isBrowser("safari")) {
          // safari does not have a deep link, so we use the `location.href`
          options.returnStrategy = location.href as ReturnStrategy;
        } else if (isBrowser("chrome")) {
          options.returnStrategy = "googlechrome://";
        } else if (isBrowser("firefox")) {
          options.returnStrategy = "firefox://";
        } else if (isBrowser("opera")) {
          options.returnStrategy = "opera-http://";
        } else {
          // fallback to the `location.href`
          options.returnStrategy = location.href as ReturnStrategy;
        }
      }

      const linkWitStrategy = addReturnStrategy(universalLink, options.returnStrategy);
      const useDeepLink = !!deepLink && !options.forceRedirect;

      // In case of deep link, use the `custom-deeplink` strategy with fallback to `universal-link`.
      if (useDeepLink) {
        openDeeplinkWithFallback(toDeeplink(linkWitStrategy, deepLink), () => {
          openLinkBlank(linkWitStrategy);
        });
      } else {
        openLinkBlank(linkWitStrategy);
      }
    } else if (isTmaPlatform("web")) {
      // Use the `back` strategy, the user will transition to the other app
      // and maybe return to the browser when the action is completed.

      // return back to the browser
      if (options.returnStrategy === "back") {
        if (isBrowser("safari")) {
          // safari does not have a deep link, so we use the `location.href`
          options.returnStrategy = location.href as ReturnStrategy;
        } else if (isBrowser("chrome")) {
          options.returnStrategy = "googlechrome://";
        } else if (isBrowser("firefox")) {
          options.returnStrategy = "firefox://";
        } else if (isBrowser("opera")) {
          options.returnStrategy = "opera-http://";
        } else {
          // fallback to the `location.href`
          options.returnStrategy = location.href as ReturnStrategy;
        }
      }

      const linkWitStrategy = addReturnStrategy(universalLink, options.returnStrategy);
      const useDeepLink = !!deepLink && !options.forceRedirect;

      // In case of deep link, use the `custom-deeplink` strategy with fallback to `universal-link`.
      if (useDeepLink) {
        openDeeplinkWithFallback(toDeeplink(linkWitStrategy, deepLink), () => {
          openLinkBlank(linkWitStrategy);
        });
      } else {
        openLinkBlank(linkWitStrategy);
      }
    } else {
      // Fallback for unknown platforms. Should use desktop strategy.

      const linkWitStrategy = addReturnStrategy(universalLink, options.returnStrategy);

      openLinkBlank(linkWitStrategy);
    }
  } else {
    if (isOS("ios")) {
      // Use the `back` strategy, the user will transition to the other app
      // and return to the browser when the action is completed.

      // return back to the browser
      if (options.returnStrategy === "back") {
        if (isBrowser("safari")) {
          // safari does not have a deep link, so we use the `location.href`
          // ref: https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app
          options.returnStrategy = location.href as ReturnStrategy;
        } else if (isBrowser("chrome")) {
          options.returnStrategy = "googlechrome://";
        } else if (isBrowser("firefox")) {
          options.returnStrategy = "firefox://";
        } else if (isBrowser("opera")) {
          options.returnStrategy = "opera-http://";
        } else {
          // fallback to the `location.href`
          options.returnStrategy = location.href as ReturnStrategy;
        }
      }

      if (isBrowser("chrome")) {
        // TODO: in case when the wallet does not exist, the location.href will be rewritten
        openLink(addReturnStrategy(universalLink, options.returnStrategy), "_self");
      } else {
        openLinkBlank(addReturnStrategy(universalLink, options.returnStrategy));
      }
    } else if (isOS("android")) {
      // Use the `back` strategy, the user will transition to the other app
      // and return to the browser when the action is completed.

      // return back to the browser
      if (options.returnStrategy === "back") {
        if (isBrowser("chrome")) {
          options.returnStrategy = "googlechrome://";
        } else if (isBrowser("firefox")) {
          options.returnStrategy = "firefox://";
        } else if (isBrowser("opera")) {
          options.returnStrategy = "opera-http://";
        } else {
          options.returnStrategy = location.href as ReturnStrategy;
        }
      }

      openLinkBlank(addReturnStrategy(universalLink, options.returnStrategy));
    } else if (isOS("ipad")) {
      // Use the `back` strategy, the user will transition to the other app
      // and return to the browser when the action is completed.

      // return back to the browser
      if (options.returnStrategy === "back") {
        options.returnStrategy = "back";
      }

      if (isBrowser("chrome")) {
        // TODO: in case when the wallet does not exist, the location.href will be rewritten
        openLink(addReturnStrategy(universalLink, options.returnStrategy), "_self");
      } else {
        openLinkBlank(addReturnStrategy(universalLink, options.returnStrategy));
      }
    } else if (isOS("macos", "windows", "linux")) {
      // Use the `back` strategy, the user will transition to the other app
      // and return to the browser when the action is completed.

      // return back to the browser
      if (options.returnStrategy === "back") {
        if (isBrowser("safari")) {
          options.returnStrategy = "none";
        } else if (isBrowser("chrome")) {
          options.returnStrategy = "googlechrome://";
        } else if (isBrowser("firefox")) {
          options.returnStrategy = "firefox://";
        } else if (isBrowser("opera")) {
          options.returnStrategy = "opera-http://";
        } else {
          options.returnStrategy = "none";
        }
      }

      const linkWitStrategy = addReturnStrategy(universalLink, options.returnStrategy);
      const useDeepLink = !!deepLink && !options.forceRedirect;

      // In case of deep link, use the `custom-deeplink` strategy with fallback to `universal-link`.
      if (useDeepLink) {
        openDeeplinkWithFallback(toDeeplink(linkWitStrategy, deepLink), () => {
          openLinkBlank(linkWitStrategy);
        });
      } else {
        openLinkBlank(linkWitStrategy);
      }
    } else {
      // Fallback for unknown platforms. Should use desktop strategy.

      openLinkBlank(addReturnStrategy(universalLink, options.returnStrategy));
    }
  }
}

/**
 * Adds a query parameter to a URL.
 * @param url
 * @param key
 * @param value
 */
function addQueryParameter(url: string, key: string, value: string): string {
  const parsed = new URL(url);
  parsed.searchParams.append(key, value);

  return parsed.toString();
}
