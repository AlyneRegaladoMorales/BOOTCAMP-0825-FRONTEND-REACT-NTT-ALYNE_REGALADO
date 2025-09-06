import type { Product } from "../interface/Products";

export const getAllProductsMapper = (products: any[]): Product[] => {
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    discountPercentage: p.discountPercentage,
    rating: p.rating,
    thumbnail: p.thumbnail,
  }));
};
