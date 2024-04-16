import { BANNER_KEY } from "components/constants";
import { MainPage } from "components/main-page/main-page";
import { shapeCollections } from "components/main-page/utils";
import { getMetaobjects } from "lib/shopify/admin";
import { getProducts, getCollections } from "lib/shopify/storefront";
import { mapMetaobjectsToBanner } from "lib/shopify/utils";
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
  const metaobject = await getMetaobjects(BANNER_KEY, 5);
  const collections = await getCollections({ first: 10 });

  if (!products || !metaobject) {
    return notFound();
  }

  //TODO add Fallback

  const banners = mapMetaobjectsToBanner(metaobject);

  const shapedCollections = shapeCollections(collections);

  return (
    <>
      <Suspense>
        <MainPage banners={banners} collections={shapedCollections} />
      </Suspense>
    </>
  );
}
