import type {  Auth, AuthResponse } from "../model/Auth";

export const loginMapper = (login: AuthResponse): Auth => {
  return {
    id: login.id,
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
  };
};

