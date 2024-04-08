import { useCartDataConductor } from "contexts/CartContext";

export const TotalSection = () => {
  const { total } = useCartDataConductor();

  if (!total) {
    return null;
  }

  return (
    <div className="pl-4">
      <div className="relative flex justify-between py-4 pr-4 text-xl font-semibold hairline-t">
        <span>Total price</span>

        <span>{total}</span>
      </div>
    </div>
  );
};
