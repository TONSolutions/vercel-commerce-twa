/* eslint-disable no-console */
//TODO add metadata
import { CartPage } from "components/cart/cart";
import { notFound } from "next/navigation";

import type { Cart } from "lib/shopify/types";

export const revalidate = 43200; // 12 hours in seconds

const cart = {
  id: "gid://shopify/Cart/c1-3f3fe6779c685717657f2ef15f465220",
  checkoutUrl:
    "https://44469c-36.myshopify.com/cart/c/c1-3f3fe6779c685717657f2ef15f465220?key=2265ca8bdd6087d1ebc766380a75a988",
  cost: {
    subtotalAmount: {
      amount: "150.0",
      currencyCode: "USD"
    },
    totalAmount: {
      amount: "150.0",
      currencyCode: "USD"
    },
    totalTaxAmount: {
      amount: "0.0",
      currencyCode: "USD"
    }
  },
  lines: [
    {
      id: "gid://shopify/CartLine/2e9a0519-437b-432a-b092-13adf2adb5ab?cart=c1-3f3fe6779c685717657f2ef15f465220",
      quantity: 1,
      cost: {
        totalAmount: {
          amount: "150.0",
          currencyCode: "USD"
        }
      },
      merchandise: {
        id: "gid://shopify/ProductVariant/45420481544434",
        title: "Blue",
        selectedOptions: [
          {
            name: "Color",
            value: "Blue"
          }
        ],
        product: {
          id: "gid://shopify/Product/8166703268082",
          handle: "mens-cap-with-the-inscription",
          availableForSale: true,
          title: "Men's cap with the inscription.",
          description: "100% Cotton",
          descriptionHtml: "100% Cotton",
          options: [
            {
              id: "gid://shopify/ProductOption/10368012386546",
              name: "Color",
              values: ["Grey", "Black", "Blue", "White"]
            }
          ],
          priceRange: {
            maxVariantPrice: {
              amount: "150.0",
              currencyCode: "USD"
            },
            minVariantPrice: {
              amount: "150.0",
              currencyCode: "USD"
            }
          },
          variants: [],
          featuredImage: {
            url: "https://cdn.shopify.com/s/files/1/0690/6704/7154/files/1fa707c32c11ce18003ec03970f09c72.png?v=1710879715",
            altText: "",
            width: 700,
            height: 700
          },
          images: [],
          seo: {
            description: "",
            title: ""
          },
          tags: [],
          updatedAt: "2024-03-26T06:41:43Z"
        }
      }
    }
  ],
  totalQuantity: 1
} as Cart;

//TODO replace cart

export default async function Page({ params }: { params: { cartId: string } }) {
  // const cart = await getCart(prepareCartIdForRequest(`/${params.cartId}`));
  console.info(params);

  if (!cart) {
    return notFound(); //TODO redirect on empty cart state
  }

  return <CartPage cart={cart} />;
}
