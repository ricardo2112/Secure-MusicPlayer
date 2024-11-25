import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../utils/api";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken, refreshToken, user } = await loginUser(username, password);
      await login(accessToken, refreshToken, user);
      setTimeout(()=> {
        navigate("/"); 
      }, 1000);
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
        <p className="mt-4">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="link">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
