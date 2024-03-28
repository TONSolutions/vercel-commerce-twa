//TODO add metadata

import { ProductPage } from "components/product/product";
import { getProduct } from "lib/shopify";
import { notFound } from "next/navigation";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { page: string } }) {
  const product = await getProduct(params.page);

  if (!product) {
    return notFound();
  }

  return <ProductPage product={product} />;
}
