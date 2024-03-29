import { CartItem } from "components/cart/components/CartItem";
import { useCartDataConductor } from "contexts/CartContext";

export const CartList = () => {
  const {
    cart: { lines }
  } = useCartDataConductor();

  return (
    <div className="flex flex-col gap-4">
      {lines.map(({ quantity, merchandise, cost, id }, index) => {
        const {
          totalAmount: { amount: price }
        } = cost;

        const {
          title: sizeColorTitle,
          product: {
            title,
            featuredImage: { url }
          }
        } = merchandise;

        const options = sizeColorTitle.replace("/", String.fromCharCode(183));

        return (
          <CartItem
            key={index}
            quantity={quantity}
            options={options}
            price={price}
            title={title}
            imageUrl={url}
            id={id}
          />
        );
      })}
    </div>
  );
};
