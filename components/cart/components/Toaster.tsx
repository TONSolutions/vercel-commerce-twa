import { Button, Toast } from "konsta/react";
import ReactDOM from "react-dom";

import type { Props as ToastProps } from "konsta/react/types/Toast";
import type { FunctionComponent } from "react";

interface Props extends ToastProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  toastText: string;
}

export const Toaster: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  buttonText,
  toastText,
  ...props
}) => {
  if (!isOpen) {
    return null;
  }

  const elem = document.getElementById("toast-root");

  if (!elem) {
    return null;
  }

  return ReactDOM.createPortal(
    <Toast
      {...props}
      opened={isOpen}
      button={
        <Button rounded clear small inline onClick={onClose}>
          {buttonText}
        </Button>
      }
    >
      <div className="shrink">{toastText}</div>
    </Toast>,
    elem
  );
};
