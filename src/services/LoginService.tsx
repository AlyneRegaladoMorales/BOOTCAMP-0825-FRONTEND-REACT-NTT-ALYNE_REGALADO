import type { Auth } from "../model/Auth";
import { loginMapper } from "../mappers/loginMapper";
import { API_URL } from "../utils/Constans";

export const loginPost = async (username: string, password: string): Promise<Auth| undefined> => {
  try {
    const response = await fetch(`${API_URL}/auth/login `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const user = loginMapper(data);
    return user;
  } catch (error) {
    throw new Error("Algo salió mal en el login, inténtelo más tarde...");
  }
};

export const requestNewAccessToken = async (refreshToken: string): Promise<string | undefined> => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    return json.accessToken;
  } catch (error) {
    throw new Error("Algo salió mal, inténtelo más tarde");
  }
};
