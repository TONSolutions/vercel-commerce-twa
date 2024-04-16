import { request } from "lib/request";

import { env } from "node:process";

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd";

export const getTonToUsdValue = async () => {
  try {
    const response = await request<{ "the-open-network": { usd: number } }>(COINGECKO_API_URL, {
      headers: { "x-cg-demo-api-key": env.COINGECKO_API_KEY ?? "" }
    });

    return response["the-open-network"].usd;
  } catch (error) {
    console.error(error);
  }
};
