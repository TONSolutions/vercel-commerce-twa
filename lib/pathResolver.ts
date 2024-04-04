import qs from "qs";

import path from "path";

interface Options {
  params: Record<string, unknown>;
  paths: string[];
  hostname: string;
}

export const pathResolver = (...options: Array<string | Record<string, unknown>>) => {
  const { hostname, paths, params } = options.reduce(
    (acc, option) => {
      if (typeof option !== "string") {
        return {
          ...acc,
          params: {
            ...acc.params,
            ...option
          }
        };
      }

      if (/^https?:\/\//.test(option)) {
        return { ...acc, hostname: option.replace(/\/$/, "") };
      }

      return { ...acc, paths: [...acc.paths, option] };
    },
    { params: {}, paths: ["/"], hostname: "" } as Options
  );

  const { pathname, query } = Object.entries(params).reduce(
    (acc, [key, value]) =>
      acc.pathname.includes(`:${key}`) && (typeof value === "string" || typeof value === "number")
        ? {
            ...acc,
            pathname: acc.pathname.replace(`:${key}`, String(value))
          }
        : {
            ...acc,
            query: {
              ...acc.query,
              [key]: value
            }
          },
    { pathname: path.join(...paths).replace(/\/$/, ""), query: {} }
  );

  const search = qs.stringify(query, {
    arrayFormat: "brackets",
    addQueryPrefix: true
  });

  return `${hostname}${pathname}${search}`;
};
