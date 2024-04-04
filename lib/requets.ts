import axios from "axios";
import { pathResolver } from "lib/pathResolver";
import { isObject } from "lib/type-guards";
import qs from "qs";

import type { AxiosError, Method } from "axios";

export const isExternal = (url: string): boolean => /^(http:\/\/|https:\/\/)/.test(url);

const isDev = process.env.NODE_ENV === "development";

export class RequestError extends Error {
  constructor(message: string, options: unknown = {}) {
    super(message);

    if (isObject(options)) {
      Object.assign(this, options);
    }
  }
}

export interface Options {
  body?: unknown;
  method?: Method;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  shouldHideAmplitudeSessionId?: boolean;
}

export const request = async <Data>(pathname: string, options?: Options) => {
  const { method = "GET", body, headers = {}, signal } = options || {};

  const APP_URL = process.env.WEBSITE_URL ?? "";

  const external = isExternal(pathname);
  const url = pathResolver(external ? "" : APP_URL, pathname);

  try {
    const { data } = await axios({
      url,
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
        ...(headers ? headers : {}),
        "X-Requested-With": "XMLHttpRequest"
      },
      ...(method.toUpperCase() === "GET" ? { params: body } : { data: body }),
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
      transformResponse: [
        (response) => {
          try {
            return JSON.parse(response);
          } catch (_) {
            return response;
          }
        }
      ],
      withCredentials: !external && !!APP_URL
    });

    return data as Data;
  } catch (error) {
    const { response } = (error || {}) as AxiosError;

    throw new RequestError("Request error", {
      ...(response
        ? {
            [typeof response.data === "string" ? "responseText" : "responseJSON"]: response.data,
            status: response.status
          }
        : {}),
      url,
      body,
      method,
      code: error.code
    });
  }
};
