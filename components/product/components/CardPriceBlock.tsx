import classNames from "classnames";
import TonIcon from "components/assets/icons/TonIcon";
import { motion } from "framer-motion";

import type { FunctionComponent } from "react";

type Props = {
  priceInTon: string;
  priceInUsd: string;
  tonPriceClassName?: string;
  tonIconClassName?: string;
};

export const CardPriceBlock: FunctionComponent<Props> = ({
  priceInTon,
  priceInUsd,
  tonPriceClassName = "text-2xl",
  tonIconClassName = "h-8 w-8"
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <div className="flex gap-2">
      <div className="flex items-center">
        <TonIcon className={tonIconClassName} />

        <span className={classNames("font-bold", tonPriceClassName)}>{priceInTon}</span>
      </div>

      <span className="self-end p-1 text-sm text-hint_color">~${priceInUsd}</span>
    </div>
  </motion.div>
);
