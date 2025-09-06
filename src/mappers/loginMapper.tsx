import type { User } from "../interface/User";

export const loginMapper = (login: any): User => {
  return {
    _id: login.id,
    firstName: login.firstName,
    lastName: login.lastName,
    username: login.username,
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
  };
};
