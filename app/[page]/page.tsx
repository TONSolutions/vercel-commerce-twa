import { ProductPage } from "components/product/product";
import { getTonToUsdValue } from "lib/getTonToUsdValue";
import { getProduct } from "lib/shopify/storefront";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const product = await getProduct(params.page);

  if (!product) {
    return {};
  }

  const title = "TON Merch Store";
  const description = `${product.title}. ${product.description}.`;
  const imageUrl = product.featuredImage.url;
  const width = product.featuredImage.width;
  const height = product.featuredImage.height;

  return {
    title,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width, height }]
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const product = await getProduct(params.page);
  const tonToUsdPrice = await getTonToUsdValue();

  if (!product || !tonToUsdPrice) {
    return notFound();
  }

  return <ProductPage product={product} tonToUsdPrice={tonToUsdPrice} />;
}
