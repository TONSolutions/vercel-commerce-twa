//TODO add metadata

import { ProductPage } from "components/product/product";
import { getTonToUsdValue } from "lib/getTonToUsdValue";
import { getProduct } from "lib/shopify/storefront";
import { notFound } from "next/navigation";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { page: string } }) {
  const product = await getProduct(params.page);
  const tonToUsdPrice = await getTonToUsdValue();

  if (!product || !tonToUsdPrice) {
    return notFound();
  }

  return <ProductPage product={product} tonToUsdPrice={tonToUsdPrice} />;
}
