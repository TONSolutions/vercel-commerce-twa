import { ProcessingStatus } from "components/constants";
import { request } from "lib/request";

interface TonTransferAction {
  type: string;
  status: string;
  TonTransfer: {
    sender: {
      address: string;
      is_scam: boolean;
      is_wallet: boolean;
    };
    recipient: {
      address: string;
      is_scam: boolean;
      is_wallet: boolean;
    };
    amount: number;
  };
  simple_preview: {
    name: string;
    description: string;
    value: string;
    accounts: {
      address: string;
      is_scam: boolean;
      is_wallet: boolean;
    }[];
  };
}

interface Event {
  event_id: string;
  account: {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
  };
  timestamp: number;
  actions: TonTransferAction[];
  is_scam: boolean;
  lt: number;
  in_progress: boolean;
  extra: number;
}

interface EventsResponse {
  events: Event[];
  next_from: number;
}

const TRANSFER_ACTION = "TonTransfer";

//TODO uncomment before final deploy
// const domain =
//   process.env.NODE_ENV === "development" ? "https://testnet.tonapi.io" : "https://tonapi.io";

const domain = "https://testnet.tonapi.io";

export async function pollTransactionStatus(
  senderAddress: string,
  amount: number
): Promise<ProcessingStatus> {
  const destinationAddress = process.env.NEXT_PUBLIC_TON_WALLET_ADDRESS;

  if (!destinationAddress || !senderAddress || !amount) {
    console.error("No valid credentials provided");

    return ProcessingStatus.Error;
  }

  const ENCODED_ACCOUNT_ADDRESS = encodeURIComponent(destinationAddress); //To replace colon in address as required in TON API

  const url = `${domain}/v2/accounts/${ENCODED_ACCOUNT_ADDRESS}/events?initiator=true&subject_only=false&limit=20`;

  let attempt = 0;

  while (attempt < 5) {
    try {
      const data = await request<EventsResponse>(url);

      const events = data.events;

      const suitableEvent = events.find((event) => {
        if (event.actions && event.actions.length > 0) {
          const tonTransferAction = event.actions.find((action) => action.type === TRANSFER_ACTION);

          if (tonTransferAction) {
            const tonTransfer = tonTransferAction.TonTransfer;

            return (
              tonTransfer.sender.address === senderAddress &&
              tonTransfer.recipient.address === destinationAddress &&
              tonTransfer.amount === amount
            );
          }
        }

        return false;
      });

      if (suitableEvent) {
        const tonTransferAction = suitableEvent.actions.find(
          (action) => action.type === TRANSFER_ACTION
        );

        if (tonTransferAction) {
          if (tonTransferAction.status === "ok") {
            return ProcessingStatus.Success;
          } else if (tonTransferAction.status === "failed") {
            return ProcessingStatus.Error;
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    attempt++;

    // Wait for 5 seconds before fetching data again
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  if (attempt === 5) {
    return ProcessingStatus.Error;
  } else {
    return ProcessingStatus.Processing;
  }
}
