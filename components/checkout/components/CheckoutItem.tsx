import type { FunctionComponent } from "react";

type Props = {
  imageUrl: string;
  title: string;
  options: string;
  price: string;
};

export const CheckoutItem: FunctionComponent<Props> = ({ imageUrl, title, options, price }) => (
  <div className="mb-4 flex justify-between gap-3 p-4 last:mb-0">
    <div className="flex w-full max-w-[75%] ">
      <img src={imageUrl} className="mr-2 h-10 w-10 rounded-xl" />

      <div className="flex w-full max-w-[85%] flex-col">
        <p className="truncate">{title}</p>

        <span className="text-hint-color text-sm">{options}</span>
      </div>
    </div>

    <span className="text-hint-color self-center">{`${price} TON`}</span>
  </div>
);
