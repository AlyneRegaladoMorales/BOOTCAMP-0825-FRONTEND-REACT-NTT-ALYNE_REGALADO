import { getCategoriesMapper } from "../mappers/categoryMapper";
import type { Category } from "../model/Category";
import { API_URL } from "../utils/Constans";

export const getCategories = async (): Promise<Category[] | undefined> => {
    try {
        const response = await fetch(`${API_URL}/products/categories`)
        if (!response.ok) {
              console.error("Error en la peticion", response.status);
              return;
            }
            const data = await response.json();
            const categories = getCategoriesMapper(data);
            console.log ("Estas son las categorias", categories)
            return categories;

    } catch (error) {
        throw new Error ("Algo salio mal, intentelo mas tarde.")

    }
}