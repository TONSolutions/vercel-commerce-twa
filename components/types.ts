import type { Telegram as TelegramInterface } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: TelegramInterface;
  }
}

type FormInput = { value: string; changed: boolean };

export type CheckoutForm = { shippingInformation: FormInput; phone: FormInput; name: FormInput };
