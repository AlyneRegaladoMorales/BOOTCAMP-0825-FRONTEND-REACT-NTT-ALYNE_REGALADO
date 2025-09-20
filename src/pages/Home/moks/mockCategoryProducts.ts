import type { Product } from "../../../model/Products";

export const mockProductsByCategory : Product[] = [
    {
      id: 121,
      title: "iPhone 5s",
      description: "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
      category: "smartphones",
      price: 199.99,
      discountPercentage: 12.91,
      rating: 2.83,
      stock: 25,
      thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",

    },
    {
      id: 122,
      title: "iPhone 6",
      description: "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
      category: "smartphones",
      price: 299.99,
      discountPercentage: 6.69,
      rating: 3.41,
      stock: 60,
      thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp",
    },
    {
      id: 123,
      title: "iPhone 13 Pro",
      description: "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
      category: "smartphones",
      price: 1099.99,
      discountPercentage: 9.37,
      rating: 4.12,
      stock: 56,
      thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
    },
   

];
