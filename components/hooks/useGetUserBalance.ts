import { address as typeAddress } from "@ton/ton";
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
      const typedAddress = typeAddress(address);

      const balance = await client?.getBalance(typedAddress);

      if (balance) {
        setBalance((Number(balance.toString()) / 1000000000).toFixed(2));
      }
    };

    getBalanceValue();
  }, [client]);

  return balance;
};
