import { getDraftOrderById } from "lib/shopify/admin";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const draftOrderId = req.nextUrl.searchParams.get("draftOrderId");

  if (draftOrderId) {
    try {
      const draftOrder = await getDraftOrderById(draftOrderId);

      return NextResponse.json(draftOrder);
    } catch (error) {
      return NextResponse.json(error);
    }
  }

  return NextResponse.json({});
}
