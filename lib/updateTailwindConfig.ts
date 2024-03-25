/* eslint-disable no-console */
import type { ThemeParams } from "@twa-dev/types";

export const updateTailwindConfig = async (themeParams: ThemeParams) => {
  const body = JSON.stringify(themeParams);

  try {
    const response = await fetch("/api/update-tailwind-config", { body, method: "POST" });

    if (response.ok) {
      console.log("Tailwind config updated successfully.");
    } else {
      console.error("Failed to update Tailwind config:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating Tailwind config:", error);
  }
};
