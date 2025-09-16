import type { User } from "../model/User";
import { getUserInfoMapper } from "../mappers/userMapper";
import { API_URL } from "../utils/Constans"

export const getUserInfo = async (accessToken: string): Promise<User | undefined> => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const user = getUserInfoMapper(data);
    return user
  } catch (error) {
    throw new Error("Algo salió mal, inténtelo más tarde")
  }
}