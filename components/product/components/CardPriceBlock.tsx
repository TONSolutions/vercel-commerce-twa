import TonIcon from "components/assets/icons/TonIcon";
import { motion } from "framer-motion";

import type { FunctionComponent } from "react";

type Props = {
  priceInTon: string;
  priceInUsd: string;
};

export const CardPriceBlock: FunctionComponent<Props> = ({ priceInTon, priceInUsd }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <div className="flex gap-2">
      <div className="flex">
        <TonIcon />

        <span className="text-2xl font-bold">{priceInTon}</span>
      </div>

      <span className="self-end p-1 text-sm text-hint_color">~${priceInUsd}</span>
    </div>
  </motion.div>
);
