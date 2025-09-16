import type { User, UserResponse } from "../model/User";

export const getUserInfoMapper = (accessToken: UserResponse): User => {
  return {
    _id: accessToken.id,
    firstName: accessToken.firstName,
    lastName: accessToken.lastName,
    username: accessToken.username,
    image: accessToken.image,
    role: accessToken.role,
    email: accessToken.email,
    university: accessToken.university,
    phone: accessToken.phone

  };
};
