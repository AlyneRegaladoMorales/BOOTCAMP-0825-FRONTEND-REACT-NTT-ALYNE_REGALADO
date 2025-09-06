import { useState } from "react";
import { loginPost } from "../services/LoginService";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { AuthResponse } from "../interface/Auth";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
      const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  try {
    const userData: AuthResponse | undefined = await loginPost(username, password);

    if (userData) {
      setErrorResponse("");
      auth.saveUser(userData);
      <Navigate to="/home" />
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
  if (auth.isAuthenticated) {
        return <Navigate to="/home" />; 
    }

  return (
    <form onSubmit={handleSubmit}>
        
      <h1>Iniciar Sesion</h1>
      <label>Usuario:</label>
      <input
        type="text"
        name="username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Contraseña:</label>
      <input
        type="password"
        name="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">iniciar sesion</button>
      
    </form>
  );
};

export default Login;
