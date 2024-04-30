import classNames from "classnames";
import DismissIcon from "components/assets/icons/DismissIcon";
import { Popover } from "components/product/components/Popover";
import { ScrollContainer } from "components/product/components/ScrollContainer";
import { SizesTable } from "components/product/components/SizesTable";
import { DEFAULT_SIZES } from "components/product/constants";
import { motion } from "framer-motion";
import { Link } from "konsta/react";
import { useState, type FunctionComponent } from "react";

import { useTheme } from "../../hooks/useTheme";

type Props = {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

export const SizesBlock: FunctionComponent<Props> = ({ sizes, selectedSize, setSelectedSize }) => {
  const [popupOpened, setPopupOpened] = useState(false);

  const { hint_color } = useTheme();

  const togglePopover = () => {
    setPopupOpened(!popupOpened);
  };

  return (
    <div>
      <div className="flex justify-between py-3">
        <span className={hint_color}>SIZE</span>

        <Link onClick={togglePopover}>SIZE GUIDE</Link>
      </div>

      <ScrollContainer>
        {DEFAULT_SIZES.map((size, index) => (
          <span
            className={classNames(
              "ani cursor-pointer rounded-xl bg-[#74748014] text-base font-bold",
              {
                "outline outline-2 outline-[#007AFF]": size === selectedSize,
                "pointer-events-none opacity-50": !sizes.includes(size)
              }
            )}
            key={index}
            onClick={() => setSelectedSize(size)}
          >
            <motion.div
              className="px-4 py-3"
              whileHover={{}}
              whileTap={{ scale: 1.4 }}
              // whileFocus={{ scale: 0.3 }}
              transition={{ duration: 0.1 }}
            >
              {size}
            </motion.div>
          </span>
        ))}
      </ScrollContainer>

      <Popover isOpen={popupOpened}>
        <div className="flex flex-col gap-4 px-4 pt-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Size Guide</h2>

            <DismissIcon onClick={togglePopover} />
          </div>

          <div className="overflow-x-scroll no-scrollbar">
            <SizesTable />
          </div>
        </div>
      </Popover>
    </div>
  );
};
