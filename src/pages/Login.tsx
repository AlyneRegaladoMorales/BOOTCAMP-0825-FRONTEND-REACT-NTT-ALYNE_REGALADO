import { useState } from "react";
import { loginPost } from "../services/LoginService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginPost(username, password);
  };

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
      <button>iniciar sesion</button>
      
    </form>
  );
};

export default Login;
