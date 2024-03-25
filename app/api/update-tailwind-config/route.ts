/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { ThemeParams } from "@twa-dev/types";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const colors = await req.json();

  if (!Object.keys(colors).length) {
    res.status(200).json({ message: "No colors provided. Default scheme is used" });
  }

  try {
    await updateTailwindConfig(colors);

    return new Response(JSON.stringify({ message: "Tailwind config updated successfully." }), {
      status: 200
    });
  } catch (error) {
    console.error("Error updating Tailwind config:", error);
  }
}

async function updateTailwindConfig(colors: ThemeParams) {
  const path = require("path");

  const configPath = path.resolve("tailwind.config.js");

  const data = require(configPath); //TODO finish
}
