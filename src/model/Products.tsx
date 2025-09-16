export interface ProductResponse{
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  tags: string[];
  brand: string;
  thumbnail: string;
  sku: string;
}
export interface Product {  
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  category: string;
  stock: number
}

