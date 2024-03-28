import classNames from "classnames";
import DismissIcon from "components/assets/icons/DismissIcon";
import { Popover } from "components/product/components/Popover";
import { ScrollContainer } from "components/product/components/ScrollContainer";
import { SizesTable } from "components/product/components/SizesTable";
import { Link } from "konsta/react";
import { useState, type FunctionComponent } from "react";

type Props = {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

export const SizesBlock: FunctionComponent<Props> = ({ sizes, selectedSize, setSelectedSize }) => {
  const [popupOpened, setPopupOpened] = useState(false);

  const togglePopover = () => {
    setPopupOpened(!popupOpened);
  };

  return (
    <div>
      <div className="flex justify-between py-3">
        <span className="text-[#6D6D72]">SIZE</span>

        <Link onClick={togglePopover}>SIZE GUIDE</Link>
      </div>

      <ScrollContainer>
        {sizes.map((size, index) => (
          <span
            className={classNames(
              "cursor-pointer rounded-xl bg-[#74748014] px-4 py-3 text-base font-bold",
              {
                "outline outline-2 outline-[#007AFF]": size === selectedSize
              }
            )}
            key={index}
            onClick={() => setSelectedSize(size)}
          >
            {size}
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
