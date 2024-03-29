import { useCartDataConductor } from "contexts/CartContext";
import { Link } from "konsta/react";

export const CartTitleSection = () => {
  const {
    cart: { totalQuantity },
    handleClearCart
  } = useCartDataConductor();

  return (
    <div className="flex w-full justify-between">
      <div className="flex">
        <h1 className="mr-2 font-bold">Your cart</h1>

        <span className="text-hint_color">{`${totalQuantity} items`}</span>
      </div>

      <Link className="text-link_color" onClick={handleClearCart}>
        Clear all
      </Link>
    </div>
  );
};
