import { useState } from "react";
import { loginPost } from "../../services/LoginService";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { Auth } from "../../model/Auth";
import Modal from "../../components/Modal/Modal";
import { ForgotLink, InputGroup, LoginBox, LoginContainer, Title } from "./Login.styled";
import { Button, ErrorText, Input } from "../../layout/styles/GlobalStyle";

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
    if (/\s/.test(username) || /\s/.test(password)) {
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
        <Navigate to="/home" />;
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotMessage("Ingrese un correo válido");
      return;
    }
    setForgotEmail("");
    setForgotMessage("");
    setShowForgotModal(false);
    setShowForgotConfirm(true);
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />;
  }
  const handleCloseForgotModal = () => {
    setUsername("");
      setPassword("");
    setShowForgotModal(false);
    setForgotEmail("");   // limpia input
    setForgotMessage(""); // limpia errores
  };

  return (
    <LoginContainer>
      <LoginBox>
        <form onSubmit={handleSubmit}>
          <Title>Iniciar Sesion</Title>
          <InputGroup>
            <label>Usuario:</label>
            <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <label>Contraseña:</label>
            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          </InputGroup>
          <Button variant="red" type="submit">iniciar sesion</Button >
        </form>

        <ForgotLink href="#" onClick={() => setShowForgotModal(true)}>
          Olvidé Contraseña
        </ForgotLink >

      </LoginBox>

      <Modal isOpen={!!errorResponse} onClose={() => setErrorResponse("")} message={errorResponse} />

      <Modal isOpen={showForgotModal} onClose={handleCloseForgotModal}>
        <form onSubmit={handleForgotSubmit}>
          <Input type="email" placeholder="Correo electrónico" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
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
