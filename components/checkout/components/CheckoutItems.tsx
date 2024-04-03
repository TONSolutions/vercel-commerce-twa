import { CheckoutItem } from "components/checkout/components/CheckoutItem";
import { useCartDataConductor } from "contexts/CartContext";

export const CheckoutItems = () => {
  const { cart } = useCartDataConductor();

  if (!cart) {
    return null;
  }

  const { lines } = cart;

  return (
    <div className="flex flex-col">
      {lines.map(({ merchandise, quantity, cost }, index) => {
        const {
          totalAmount: { amount: price }
        } = cost;

        const {
          product: {
            featuredImage: { url },
            title
          },
          title: sizeColorTitle
        } = merchandise;

        const options = (sizeColorTitle + ` / x${quantity}`).replaceAll(
          "/",
          String.fromCharCode(183)
        );

        return (
          <CheckoutItem key={index} imageUrl={url} title={title} options={options} price={price} />
        );
      })}
    </div>
  );
};
