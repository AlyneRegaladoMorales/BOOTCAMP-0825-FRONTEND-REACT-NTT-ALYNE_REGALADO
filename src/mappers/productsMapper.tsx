import type { Product, ProductResponse } from "../model/Products";

export const getAllProductsMapper = (products: ProductResponse[]): Product[] => {
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    discountPercentage: p.discountPercentage,
    rating: p.rating,
    thumbnail: p.thumbnail,
    category: p.category,
    stock: p.stock
  }));
};
