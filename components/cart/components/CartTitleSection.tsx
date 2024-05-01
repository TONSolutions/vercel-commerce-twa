import { useCartDataConductor } from "contexts/CartContext";
import { Link } from "konsta/react";

export const CartTitleSection = () => {
  const { itemsQuantity, handleClearCart } = useCartDataConductor();

  if (!itemsQuantity) {
    return null;
  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex">
        <h1 className="mr-2 font-bold">Your cart</h1>

        <span className="text-hint-color">{`${itemsQuantity} items`}</span>
      </div>

      <Link className="text-link-color" onClick={handleClearCart}>
        Clear all
      </Link>
    </div>
  );
};
