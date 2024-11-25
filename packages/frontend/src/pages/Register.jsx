import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(username, password);
      navigate("/login"); // Redirige al login después del registro exitoso
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>
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
        <button type="submit">Registrarse</button>
        <p className="mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="link">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
