import { addItem } from "components/cart/actions";
import { getValueFromTelegramCloudStorage, setValueFromTelegramCloudStorage } from "lib/utils";

export const addToCart = async ({
  selectedVariantId
}: {
  selectedVariantId: string | undefined;
}) => {
  try {
    if (!selectedVariantId) {
      throw new Error("No selected variant ID provided");
    }

    const cartId = (await getValueFromTelegramCloudStorage("cartId")) as string;

    const { cart, createdCartId } = await addItem(selectedVariantId, cartId);

    if (createdCartId) {
      setValueFromTelegramCloudStorage("cartId", createdCartId);
    }

    return { success: "Product successfully added", data: cart };
  } catch (error) {
    console.error("Unable to add product", error);

    return { error: "Something went wrong" };
  }
};
