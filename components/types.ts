import type { Telegram as TelegramInterface } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: TelegramInterface;
  }
}
