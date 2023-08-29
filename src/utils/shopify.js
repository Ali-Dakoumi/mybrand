/* eslint-disable no-undef */
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
const domain = process.env.SHOPIFY_STORE_DOMAIN

export async function fetchFakeProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch fake products');
  }
}

async function ShopifyData(query, message = "") {
  const URL = `https://${domain}/api/2022-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => response.json());
    return data;
  } catch (error) {
    throw new Error(message , " ", error);
  }
}

export async function getProductsInCollection() {
  const query = `
  {
    collection(handle: "frontpage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query, "getProductsInCollection failed");

  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}

export async function getAllHandles() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          handle
          id
          title
            priceRange {
                minVariantPrice {
                    amount
            }
         }
         featuredImage {
            originalSrc
            altText
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query, "getAllHandles failed");
  if (!response.data) {
    throw new Error('couldnt fetch handles')
  }
  const data = response.data.products.edges
    ? response.data.products.edges
    : [];

  return data;
}

export async function getAllProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          handle
          id
          title
            priceRange {
                minVariantPrice {
                    amount
            }
         }
         featuredImage {
            originalSrc
            altText
          }
        }
      }
    }
  }`;
  let response
  try {
   response = await ShopifyData(query, "getAllProducts failed");
  } catch (error) {
  }

  if (!response.data) {
    throw new Error('couldnt fetch products')
  }
  const data = response.data.products.edges
    ? response.data.products.edges
    : [];

  return data;
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      featuredImage {
        url
        height
        width
        id
        altText
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query, "getProduct failed");

  const product = response.data.product
    ? response.data.product
    : [];

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;
  let response
  try {
    response = await ShopifyData(query, "createCheckout failed");
  } catch (error) {
    console.log(error)
  }


  const checkout = response?.data?.checkoutCreate?.checkout
    ? response?.data?.checkoutCreate?.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`);

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;
  let response
  try {
    response = await ShopifyData(query, "updateCheckout failed");
  } catch (error) {
    console.log(error)
  }

  const checkout = response?.data.checkoutLineItemsReplace?.checkout
    ? response?.data?.checkoutLineItemsReplace?.checkout
    : [];

  return checkout;
}

// eslint-disable-next-line no-unused-vars
// export async function recursiveCatalog(cursor = "", initialRequest = true) {
//   let data;

//   if (cursor !== "") {
//     const query = `{
//       products(after: "${cursor}", first: 250) {
//         edges {
//           cursor
//           node {
//             id
//             handle
//           }
//         }
//         pageInfo {
//           hasNextPage
//         }
//       }
//     }`;

//     const response = await ShopifyData(query, "recursiveCatalog failed");
//     data = response.data.products.edges ? response.data.products.edges : [];

//     if (response.data.products.pageInfo.hasNextPage) {
//       const num = response.data.products.edges.length;
//       const cursor = response.data.products.edges[num - 1].cursor;

//       return data.concat(await recursiveCatalog(cursor));
//     } else {
//       return data;
//     }
//   } else {
//     const query = `{
//       products(first: 250) {
//         edges {
//           cursor
//           node {
//             id
//             handle
//           }
//         }
//         pageInfo {
//           hasNextPage
//         }
//       }
//     }
//     `;

//     const response = await ShopifyData(query , "recursiveCatalog failed");
//     data = response.data.products.edges ? response.data.products.edges : [];

//     if (response.data.products.pageInfo.hasNextPage) {
//       const num = response.data.products.edges.length;
//       const cursor = response.data.products.edges[num - 1].cursor;

//       return data.concat(await recursiveCatalog(cursor));
//     } else {
//       return data;
//     }
//   }
// }