import type {  Auth, AuthResponse } from "../model/Auth";
import type { User } from "../model/User";

export const loginMapper = (login: AuthResponse): Auth => {
  return {
    id: login.id,
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
  };
};

