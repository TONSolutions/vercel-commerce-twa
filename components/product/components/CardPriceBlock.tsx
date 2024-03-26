import TonIcon from "components/icons/TonIcon";

import type { FunctionComponent } from "react";

type Props = {
  priceInTon: string;
  priceInUsd: string;
};

export const CardPriceBlock: FunctionComponent<Props> = ({ priceInTon, priceInUsd }) => (
  <div className="flex gap-2">
    <div className="flex">
      <TonIcon />

      <span className="text-2xl font-bold">{priceInTon}</span>
    </div>

    <span className="self-end p-1 text-sm text-hint_color">~${priceInUsd}</span>
  </div>
);
