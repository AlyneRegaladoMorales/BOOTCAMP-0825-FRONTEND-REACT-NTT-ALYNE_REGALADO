import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../interface/User";
import { getUserInfo } from "../services/UserService";
import { requestNewAccessToken } from "../services/LoginService";
import type { AuthResponse } from "../interface/Auth";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: (): string => "",
  getRefreshToken: (): string | null => null,
  getUser: () => ({} as User | undefined),
  saveUser: (userData: AuthResponse) => {},

    // signOut: () => {},
    signOut: () => {}, 
    
});
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //valor de acceso por defecto
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);


  const checkAuth = async (): Promise<void> => {
    if (accessToken) {
      const user = await getUserInfo(accessToken);
      if (user) {
        saveSesionInfo(user, accessToken, getRefreshToken()!);
        setIsLoading(false);
        return;
      }
    } else {
      const token = getRefreshToken();
      if (token) {
        const newAccesToken = await requestNewAccessToken(token);
        if (newAccesToken) {
          const user = await getUserInfo(newAccesToken);
          if (user) {
            saveSesionInfo(user, newAccesToken, token);
            setIsLoading(false);
            return;
          }
        }
      }
    }
    setIsLoading(false);
  };

  const getAccessToken = ():string => {
    return accessToken;
  };
  const getRefreshToken = (): string | null => {
    const tokenData = localStorage.getItem("refreshToken");
    if (tokenData) {
      const { refreshToken } = JSON.parse(tokenData);
      return refreshToken;
    }
    return null;
  };
  const getUser = () => {
    return user;
  };

  const saveUser = (userData: AuthResponse): void=>{
    saveSesionInfo(userData.user, userData.accessToken, userData.refreshToken);
  }

 

  const saveSesionInfo = (
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ): void => {
    setAccessToken(accessToken);
    localStorage.setItem("refreshToken", JSON.stringify({ refreshToken }));
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const signOut = () => {
    setAccessToken("");
    setUser(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem("refreshToken");
  };

  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        getRefreshToken,
        getUser,
        saveUser,
        signOut
      }}
    >
      {isLoading ? <div> Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
