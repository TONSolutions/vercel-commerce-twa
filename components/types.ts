import type { Telegram as TelegramInterface } from "@twa-dev/types";

type TelegramWebviewProxy = {
  postEvent(eventType: string, eventData: string): void;
};

declare global {
  interface External {
    notify: (message: string) => void;
  }
  interface Window {
    TelegramWebviewProxy?: TelegramWebviewProxy;
    Telegram: TelegramInterface;
  }
}

type FormInput = { value: string; changed: boolean };

export type CheckoutForm = { shippingInformation: FormInput; phone: FormInput; name: FormInput };
