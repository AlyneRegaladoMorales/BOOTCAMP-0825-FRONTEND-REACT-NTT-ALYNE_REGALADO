import type { Product } from "../model/Products";
import { getAllProductsMapper } from "../mappers/productsMapper";
import { API_URL } from "../utils/Constans";

export const getAllProducts = async (): Promise<Product[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/products?limit=0`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const products = getAllProductsMapper(data.products);
    return products;
  } catch (error) {
    console.error("Error al cargar los productos", error);
  }
};

export const getProductsByCategory = async (c: string): Promise<Product[] | undefined> => {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${encodeURIComponent(c)}`
    );
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const products = getAllProductsMapper(data.products);
    return products;
  } catch (error) {
    throw new Error("Algo salio mal, intentalo mas tarde");
  }
};
