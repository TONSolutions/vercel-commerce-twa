import { getCart } from "lib/shopify";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const cartId = req.nextUrl.searchParams.get("cartId");

  if (cartId) {
    try {
      const cart = await getCart(cartId);

      return NextResponse.json(cart);
    } catch (error) {
      return new NextResponse();
    }
  }

  return NextResponse.json({});
}
