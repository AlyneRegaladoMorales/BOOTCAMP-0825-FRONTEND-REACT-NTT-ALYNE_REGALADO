import type { AuthResponse } from "../interface/Auth";
import { accessTokenResponseMapper, loginMapper } from "../mappers/loginMapper";
import { API_URL } from "../utils/Constans";

export const loginPost = async (username: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      console.log("Credenciales correctas");
      const data = await response.json();
      const user = loginMapper(data);
      return user;
    }else {
        throw new Error("Credenciales inválidas");
    }
  } catch (error) {
    throw new Error("Algo salió mal, inténtelo más tarde");
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
        expiresInMins: 30,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      const rt = accessTokenResponseMapper(json);
      return rt.accessToken;
    } else{
        throw new Error("No se pudo refrescar el token");
    }
  } catch (error) {
    throw new Error("Algo salió mal, inténtelo más tarde");
  }
};
