import { MainPage } from "components/main-page/MainPage";
import { getProducts } from "lib/shopify";
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
  const products = await getProducts({});

  if (!products) {
    return notFound();
  }

  //TODO add Fallback

  return (
    <>
      <Suspense>
        <MainPage products={products} />
      </Suspense>
    </>
  );
}
