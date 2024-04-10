import MessageIcon from "components/assets/icons/MessageIcon";
import { HintText } from "components/common/ui/HintText";
import { Button, Card } from "konsta/react";

import type { FunctionComponent } from "react";

type Props = {
  onClick: () => void;
};
export const ContactSupportBlock: FunctionComponent<Props> = ({ onClick }) => (
  <>
    <Card>
      <Button clear onClick={onClick} className="w-max !p-0 !text-base !font-normal capitalize">
        <MessageIcon className="mr-4" />

        <span>Contact support</span>
      </Button>
    </Card>

    <HintText>If you have any questions about your order, please contact support.</HintText>
  </>
);
