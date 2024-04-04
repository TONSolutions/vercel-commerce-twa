import { MainPage } from "components/main-page/main-page";
import { getProducts } from "lib/shopify/storefront";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
