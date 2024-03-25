//TODO add metadata

// import { getProduct } from "lib/shopify";

export const runtime = "edge";

export const revalidate = 43200; // 12 hours in seconds

export default async function Page({ params }: { params: { page: string } }) {
  // const product = await getProduct(params.page);

  // console.log("PAGE", product);

  return (
    <>
      <h1>{`HELLO! ${params.page}`}</h1>
    </>
  );
}
