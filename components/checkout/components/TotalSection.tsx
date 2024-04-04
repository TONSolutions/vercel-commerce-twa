import { useCartDataConductor } from "contexts/CartContext";

export const TotalSection = () => {
  const { total } = useCartDataConductor();

  if (!total) {
    return null;
  }

  return (
    <div className="flex justify-between pt-4 text-xl font-semibold">
      <span>Total price</span>

      <span>{total}</span>
    </div>
  );
};
