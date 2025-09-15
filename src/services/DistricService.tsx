import { getDistricMapper } from "../mappers/districMapper";
import type { Distric } from "../model/Distric";

export const getDistricService = async (): Promise<Distric[] | undefined> => {
    try {
        const response = await fetch("/distritos.json")
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const districs = getDistricMapper(data.distritos)
        return districs

    } catch (error) {
        throw new Error("Algo salio mal, intentalo mas tarde")
    }

}