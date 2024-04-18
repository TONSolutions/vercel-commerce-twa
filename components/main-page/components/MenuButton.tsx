"use client";

import BoxIcon from "components/assets/icons/BoxIcon";
import ChevronDownIcon from "components/assets/icons/ChevronDownIcon";
import IconPlus from "components/assets/icons/IconPlus";
import LogoutIcon from "components/assets/icons/LogoutIcon";
import TonIcon from "components/assets/icons/TonIcon";
import WalletIcon from "components/assets/icons/WalletIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "components/common/ui/dropdown-menu";
import { useGetUserBalance } from "components/hooks/useGetUserBalance";
import { truncateMiddle } from "lib/utils";

import type { FunctionComponent } from "react";

type Props = {
  address: string;
  handleAddBalanceCLick: () => void;
  handleDisconnectWallet: () => void;
  handleMoveToOrders: () => void;
};

export const MenuButton: FunctionComponent<Props> = ({
  address,
  handleAddBalanceCLick,
  handleDisconnectWallet,
  handleMoveToOrders
}) => {
  const truncatedAddress = truncateMiddle(address);
  const balance = useGetUserBalance({ address });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2 flex w-max items-center gap-1 rounded-full bg-bg_color px-4 py-1">
        <TonIcon className="h-8 w-8 w-full" />

        <span className="text-base font-semibold">{truncatedAddress}</span>

        <ChevronDownIcon className="h-6 w-3 w-full" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[250px] rounded-xl border-none bg-bg_color/70 bg-blend-overlay backdrop-blur-md"
        align="end"
      >
        <div className="relative flex items-center gap-4 px-4 py-3 hairline-b">
          <WalletIcon />

          <div className="flex w-[130px] flex-col">
            <span className="text-sm text-[#8E8E93]">Balance</span>

            <div className="flex items-center">
              <TonIcon className="mr-[2px] h-[22px] w-[22px]" />

              <span className="font-semibold">{balance}</span>
            </div>
          </div>

          <IconPlus className="cursor-pointer" onClick={handleAddBalanceCLick} />
        </div>

        <div
          className="relative flex cursor-pointer items-center gap-4 px-4 py-3 hairline-b"
          onClick={handleDisconnectWallet}
        >
          <LogoutIcon />

          <div className="flex w-[130px]">
            <span className="font-semibold">Disconnect</span>
          </div>
        </div>

        <div
          className="relative flex cursor-pointer items-center gap-4 px-4 py-3"
          onClick={handleMoveToOrders}
        >
          <BoxIcon />

          <div className="flex w-[130px]">
            <span className="font-semibold">My orders</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
