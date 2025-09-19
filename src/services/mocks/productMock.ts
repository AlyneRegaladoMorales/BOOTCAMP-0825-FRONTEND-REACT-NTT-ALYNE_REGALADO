import type { ProductResponse } from "../../model/Products";

export const ProductMock: { products: ProductResponse[] } = {
  products: [
    {
        id: 1,
        title: "Perfume Oil",
        description: "Mega Discount, Impression of A...",
        price: 13,
        discountPercentage: 8.4,
        rating: 4.26,
        stock: 65,
        brand: "Impression of Acqua Di Gio",
        category: "fragrances",
        thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
        tags: [],
        sku: ""
    },
    {
        id: 2,
        title: "Brown Perfume",
        description: "Royal Mirage Sport Brown Perfume...",
        price: 40,
        discountPercentage: 15.66,
        rating: 4,
        stock: 52,
        brand: "Royal Mirage",
        category: "fragrances",
        thumbnail: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
        tags: [],
        sku: ""
    },
  ],
};
