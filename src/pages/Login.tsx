import { useState } from "react";
import { loginPost } from "../services/LoginService";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { AuthResponse } from "../model/Auth";
import Modal from "../components/Modal";

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
      const userData: AuthResponse | undefined = await loginPost(
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
    setForgotMessage("");
    setShowForgotModal(false);
    setShowForgotConfirm(true);
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesion</h1>
        <label>Usuario:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}/>
        <label>Contraseña:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}/>
        <button type="submit">iniciar sesion</button>
      </form>
      <p>
        <a href="#" onClick={() => setShowForgotModal(true)}>
          Olvidé Contraseña
        </a>
      </p>
      <Modal isOpen={!!errorResponse} onClose={() => setErrorResponse("")} message={errorResponse}/>

      <Modal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)}>
        <form onSubmit={handleForgotSubmit}>
          <input type="email" placeholder="Correo electrónico" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
          {forgotMessage && <p style={{ color: "black" }}>{forgotMessage}</p>}
          <button type="submit">Enviar</button>
        </form>
      </Modal>

      <Modal
        isOpen={showForgotConfirm}
        message="Correo enviado correctamente"
        onClose={() => setShowForgotConfirm(false)}
      />
    </>
  );
};

export default Login;
