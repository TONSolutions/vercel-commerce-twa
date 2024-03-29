import classNames from "classnames";
import MinusIcon from "components/assets/icons/MinusIcon";
import PlusIcon from "components/assets/icons/PlusIcon";
import { useCartDataConductor } from "contexts/CartContext";

import type { FunctionComponent } from "react";

type Props = {
  quantity: number;
  id: string;
};

export const ActionButtons: FunctionComponent<Props> = ({ quantity, id }) => {
  //TODO loading state
  const { handleUpdateQuantity } = useCartDataConductor();

  const onMinusClick = () => handleUpdateQuantity({ id, quantity: quantity - 1 });
  const onPlusClick = () => handleUpdateQuantity({ id, quantity: quantity + 1 });

  const iconStyles = classNames("rounded-full bg-[#e5f1ff] cursor-pointer", {});

  return (
    <div className="flex gap-2 self-center">
      <MinusIcon onClick={onMinusClick} className={iconStyles} />

      <span className="text-center font-semibold">{quantity}</span>

      <PlusIcon onClick={onPlusClick} className={iconStyles} />
    </div>
  );
};
