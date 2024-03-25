import { getProducts } from "lib/shopify";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const runtime = "edge";

export const metadata = {
  description: "High-performance ecommerce store built with Next.js, Vercel, and Shopify.", //TODO remove
  openGraph: {
    type: "website"
  }
};

export default async function HomePage() {
  const products = await getProducts({}); //TODO типизация

  if (!products) {
    return notFound();
  }

  return (
    <>
      <Suspense>
        <div className="m-auto grid max-w-[1200px] grid-cols-2 gap-2">
          {products.map((product, index) => (
            <Link key={index} href={`/${product.handle}`}>
              <div className="rounded-xl border">{product.title}</div>
            </Link>
          ))}
        </div>
      </Suspense>
    </>
  );
}
