import type { User } from "../interface/User";
import { loginMapper } from "../mappers/loginMapper";
import { API_URL } from "../utils/Constans";

export const loginPost = async (username: string, password: string): Promise<User | undefined> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if(response.ok){
                console.log("Credenciales correctas");
                const data = await response.json();
                const user = loginMapper(data);
                return user
            }

    } catch (error) {
        console.error(error);
    }
};
