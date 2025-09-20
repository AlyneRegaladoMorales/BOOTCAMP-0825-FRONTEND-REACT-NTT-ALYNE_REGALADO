import { useState } from "react";
import { loginPost } from "../../services/LoginService";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { Auth } from "../../model/Auth";
import Modal from "../../components/Modal/Modal";
import { ForgotLink, InputGroup, LoginBox, LoginContainer, Title } from "./Login.styled";
import { Button, ErrorText, Input } from "../../utils/GlobalStyle";
import { AppPaths } from "../../utils/AppPaths";
import { EMAIL_REGEX, WHITESPACE_REGEX } from "../../utils/Validators";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorResponse, setErrorResponse] = useState("");

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [showForgotConfirm, setShowForgotConfirm] = useState(false);

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorResponse("Usuario y contraseña son obligatorios");
      return;
    }
    if (WHITESPACE_REGEX.test(username) || WHITESPACE_REGEX.test(password)) {
      setErrorResponse("Usuario y contraseña no deben contener espacios");
      return;
    }
    try {
      const userData: Auth | undefined = await loginPost(
        username,
        password
      );
      if (userData) {
        auth.saveUser(userData);
        <Navigate to={AppPaths.HOME} />;
      } else {
        setErrorResponse("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setErrorResponse(
        error instanceof Error ? error.message : "Error desconocido"
      );

    }
    finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(forgotEmail)) {
      setForgotMessage("Ingrese un correo válido");
      return;
    }
    setForgotEmail("");
    setForgotMessage("");
    setShowForgotModal(false);
    setShowForgotConfirm(true);
  };

  if (auth.isAuthenticated) {
    return <Navigate to={AppPaths.HOME} />;
  }
  const handleCloseForgotModal = () => {
    setUsername("");
    setPassword("");
    setShowForgotModal(false);
    setForgotEmail("");
    setForgotMessage("");
  };

  return (
    <LoginContainer>
      <LoginBox>
        <form onSubmit={handleSubmit}>
          <Title>Iniciar Sesión</Title>
          <InputGroup>
            <label htmlFor="username">Usuario:</label>
            <Input id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Contraseña:</label>
            <Input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          </InputGroup>
          <Button variant="red" type="submit">Iniciar sesión</Button >
        </form>

        <ForgotLink href="#" onClick={() => setShowForgotModal(true)}>
          Olvidé Contraseña
        </ForgotLink >

      </LoginBox>

      <Modal isOpen={!!errorResponse} onClose={() => setErrorResponse("")} message={errorResponse} />

      <Modal isOpen={showForgotModal} onClose={handleCloseForgotModal}>
        <form onSubmit={handleForgotSubmit}>
          <Input id="forgotEmail" type="email" placeholder="Correo electrónico" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
          {forgotMessage && <ErrorText>{forgotMessage}</ErrorText>}
          <Button variant="black" type="submit">Enviar</Button>
        </form>
      </Modal>

      <Modal
        isOpen={showForgotConfirm}
        message="Correo enviado correctamente"
        onClose={() => setShowForgotConfirm(false)}
      />
    </LoginContainer>
  );
};

export default Login;
