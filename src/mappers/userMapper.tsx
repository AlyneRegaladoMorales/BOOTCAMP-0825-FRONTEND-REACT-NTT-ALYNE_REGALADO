import type { User } from "../interface/User";

export const getUserInfoMapper = (accessToken: any): User => {
  return {
    _id: accessToken.id,
    firstName: accessToken.firstName,
    lastName: accessToken.lastName,
    username: accessToken.username,
  };
};
