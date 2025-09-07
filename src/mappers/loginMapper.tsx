import type { AccessTokenResponse, AuthResponse } from "../model/Auth";
import type { User } from "../model/User";

export const loginMapper = (login: any): AuthResponse => {
  const user: User = {
    _id: login.id,
    firstName: login.firstName,
    lastName: login.lastName,
    username: login.username,
  };
  return {
    user,
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
  };
};
export const accessTokenResponseMapper = (refreshtoken: AccessTokenResponse): AccessTokenResponse => {
  return {
    accessToken: refreshtoken.accessToken,
    refreshToken: refreshtoken.refreshToken,
  };
};
