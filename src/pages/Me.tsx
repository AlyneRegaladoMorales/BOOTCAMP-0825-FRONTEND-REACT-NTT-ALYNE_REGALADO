import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import type { User } from "../model/User";
import { getUserInfo } from "../services/UserService";
import PortalLayout from "../layout/PortalLayout/PortalLayout";
import { Navigate } from "react-router-dom";

const Me = () => {
  const auth = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userInfo();
  }, []);

  const userInfo = async (): Promise<void> => {
    try {
      const accessToken = auth.getAccessToken();
      const user = await getUserInfo(accessToken);

      if (user) {
        setUserData(user);
      } else {
        throw new Error("No se pudo obtener la información del usuario");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }

  return (
    <div>
      <PortalLayout children={undefined} />
      <h1>Profile de {auth.getUser()?.firstName || ""}</h1>
      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && (
        <div>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>First Name:</strong> {userData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.lastName}
          </p>
        </div>
      )}
    </div>
  );
};

export default Me;
