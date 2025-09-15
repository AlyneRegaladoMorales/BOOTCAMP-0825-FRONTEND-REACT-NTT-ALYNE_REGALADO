import { useState } from "react";
import { loginPost } from "../../services/LoginService";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { Auth } from "../../model/Auth";
import Modal from "../../components/Modal/Modal";
import { ForgotLink, InputGroup, LoginBox, LoginContainer, Title } from "./Login.styled";
import { Button, Input } from "../../layout/styles/GlobalStyle";

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

    try {
      const userData: Auth | undefined = await loginPost(
        username,
        password
      );

      if (userData) {
        auth.saveUser(userData);
        <Navigate to="/home" />;
      } else {
        setErrorResponse("No se pudo iniciar sesión");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorResponse(error.message);
      } else {
        setErrorResponse("Error desconocido");
      }
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
        <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}/>
        </InputGroup>
        <InputGroup>
        <label>Contraseña:</label>
        <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}/>
        
        </InputGroup>
        <Button variant="red" type="submit">iniciar sesion</Button >
      </form>
      
        <ForgotLink  href="#" onClick={() => setShowForgotModal(true)}>
          Olvidé Contraseña
        </ForgotLink >
      
      </LoginBox>
      
      <Modal isOpen={!!errorResponse} onClose={() => setErrorResponse("")} message={errorResponse}/>

      <Modal isOpen={showForgotModal} onClose={handleCloseForgotModal}>
        <form onSubmit={handleForgotSubmit}>
          <Input type="email" placeholder="Correo electrónico" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
          {forgotMessage && <p style={{ color: "black" }}>{forgotMessage}</p>}
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
