import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { ProfileContainer, Avatar} from "./Me.styled";
import { getUserInfo } from "../../services/UserService";
import { useAuth } from "../../context/AuthProvider";
import type { User } from "../../model/User";
import PortalLayout from "../../layout/PortalLayout/PortalLayout";
import { Badge, ErrorText, InfoSection, LoaderWrapper } from "../../utils/GlobalStyle";
import { AppPaths } from "../../utils/AppPaths";

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
    return <Navigate to={AppPaths.ROOT} />;
  }

  return (
    <PortalLayout>
      {isLoading && <LoaderWrapper>Cargando...</LoaderWrapper>}
      {error && <ErrorText>{error}</ErrorText>}

      {userData && (
        <ProfileContainer>
          <Avatar src={userData.image} alt={userData.firstName} />

          <InfoSection>
            <h2>
              {userData.firstName} {userData.lastName}

            </h2>
            <p>
              <strong>Rol:</strong> <Badge>{userData.role}</Badge>
            </p>
            <p>
              <strong>Usuario:</strong> {userData.username}
            </p>
            <p>
              <strong>Correo:</strong> {userData.email}
            </p>
            <p>
              <strong>Telefono:</strong> {userData.phone}
            </p>

            <p>
              <strong>Universidad:</strong> {userData.university}
            </p>
          </InfoSection>
        </ProfileContainer>
      )}
    </PortalLayout>
  );
};

export default Me;
