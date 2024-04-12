import type { FunctionComponent } from "react";

type Props = {
  total: string;
};

export const TotalSection: FunctionComponent<Props> = ({ total }) => {
  if (!total) {
    return null;
  }

  return (
    <div className="pl-4">
      <div className="relative flex justify-between py-4 pr-4 text-xl font-semibold hairline-t">
        <span>Total price</span>

        <span>{`${total} TON`}</span>
      </div>
    </div>
  );
};
