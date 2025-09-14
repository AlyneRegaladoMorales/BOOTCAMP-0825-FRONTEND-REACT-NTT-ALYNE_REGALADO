import type { User, UserResponse } from "./User";

export interface AuthResponse {
    id: number
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponseError {
    error: string;
}

export interface Auth {
    id: number
    accessToken: string;
    refreshToken: string;
}