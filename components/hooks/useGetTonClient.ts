import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "components/hooks/useAsyncInitialize";
// const isDev = process.env.NODE_ENV === "development";

export function useTonClient() {
  // const network = isDev ? "testnet" : "mainnet";

  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network: "testnet" })
      })
  );
}
