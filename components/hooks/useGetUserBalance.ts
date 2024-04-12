import { address as typeAddress } from "@ton/ton";
import { NANOTONS_IN_TON } from "components/constants";
import { useTonClient } from "components/hooks/useGetTonClient";
import { useEffect, useState } from "react";

type Options = {
  address: string;
};

export const useGetUserBalance = ({ address }: Options) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const client = useTonClient();

  useEffect(() => {
    const getBalanceValue = async () => {
      if (!address) {
        console.error("No address provided");
        setBalance("");

        return;
      }

      const typedAddress = typeAddress(address);

      const balance = await client?.getBalance(typedAddress);

      if (balance) {
        setBalance((Number(balance.toString()) / NANOTONS_IN_TON).toFixed(2));
      }
    };

    getBalanceValue();
  }, [client]);

  return balance;
};
