import type { FunctionComponent } from "react";

type Props = {
  title: string;
  description: string;
};

export const CardTitleBlock: FunctionComponent<Props> = ({ title, description }) => (
  <div>
    <h1 className="text-base">{title}</h1>

    <p className="text-base">{description}</p>
  </div>
);
