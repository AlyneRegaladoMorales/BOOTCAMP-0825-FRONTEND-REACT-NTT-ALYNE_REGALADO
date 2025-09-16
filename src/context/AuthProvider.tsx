import { createContext, useContext, useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { User } from "../model/User";
import { getUserInfo } from "../services/UserService";
import { requestNewAccessToken } from "../services/LoginService";
import type { Auth } from "../model/Auth";
import { LoaderWrapper } from "../utils/GlobalStyle";


const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: (): string => "",
  getRefreshToken: (): string | null => null,
  getUser: () => ({} as User | undefined),
  saveUser: (userData: Auth) => { },
  signOut: () => { },
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    let token = accessToken ? accessToken : getRefreshToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    if (!accessToken) {
      token = (await requestNewAccessToken(token)) ?? "";
    }

    if (token) {
      const currentUser = await getUserInfo(token);
      if (currentUser) {
        saveSesionInfo(currentUser, token, getRefreshToken() ?? "");
      }
    }

    setIsLoading(false);
  };

  const getAccessToken = (): string => {
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

  const saveUser = async (userData: Auth): Promise<void> => {
    const userInfo = await getUserInfo(userData.accessToken);
    if (userInfo) {
      saveSesionInfo(userInfo, userData.accessToken, userData.refreshToken);
    }
  };

  const saveSesionInfo = (userInfo: User, accessToken: string, refreshToken: string): void => {
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
      {isLoading ? <LoaderWrapper> Cargando...</LoaderWrapper> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
