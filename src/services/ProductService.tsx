import type { Product } from "../interface/Products";
import { getAllProductsMapper } from "../mappers/productsMapper";
import { API_URL } from "../utils/Constans";

export const getAllProducts = async (): Promise<Product[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      console.error("Error en la peticion", response.status);
      return;
    }
    const data = await response.json();
    const products = getAllProductsMapper(data.products);
    return products;
  } catch (error) {
    console.error("Error al cargar los productos", error);
  }
};
