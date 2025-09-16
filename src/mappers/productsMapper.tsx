import type { Product, ProductResponse } from "../model/Products";

export const getAllProductsMapper = (products: ProductResponse[]): Product[] => {
  return products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    thumbnail: product.thumbnail,
    category: product.category,
    stock: product.stock
  }));
};
