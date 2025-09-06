import type { User } from "./User";

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponseError {
    error: string;
}
/*https://dummyjson.com/auth/refresh*/
export interface AccessTokenResponse {
    accessToken: string;
    refreshToken: string;
}
