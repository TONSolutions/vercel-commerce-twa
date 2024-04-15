import type { Collection } from "lib/shopify/storefront/types";

export const shapeCollections = (collections: Collection[]) => {
  const updatedCollections = [{ title: "All", id: "", products: [] }, ...collections];
  const allIndex = updatedCollections.findIndex((obj) => obj.title === "All");

  if (allIndex !== -1) {
    const allCopy = { ...updatedCollections[allIndex] };
    updatedCollections.forEach((obj, index) => {
      if (index !== allIndex) {
        allCopy.products.push(...obj.products);
      }
    });

    return [
      ...updatedCollections.slice(0, allIndex),
      allCopy,
      ...updatedCollections.slice(allIndex + 1)
    ];
  }

  return updatedCollections;
};
