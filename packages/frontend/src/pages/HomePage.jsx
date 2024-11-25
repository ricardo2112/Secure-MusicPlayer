import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("loading:", loading);
  console.log("user:", user);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-center text-xl font-bold">Music Application</h1>
      </div>
      <h1 className="text-4xl font-bold">Bienvenido a la aplicación</h1>

      {!isAuthenticated ? (
        <>
          <p className="mt-4 text-lg">Por favor, inicia sesión para continuar.</p>
          <Link
            to="/login"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
          >
            Iniciar Sesión
          </Link>
        </>
      ) : (
        <>
          <p className="mt-4 text-lg">
            ¡Hola, <strong>{user.username || 'Usuario'}</strong>! Bienvenido de nuevo.
          </p>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate("/musicplayer")}
              className="px-4 py-2 rounded bg-blue-800 text-white"
            >
              Reproductor
            </button>
            <button
              onClick={() => navigate("/comunidad")}
              className="px-4 py-2 rounded bg-blue-800 text-white"
            >
              Comunidad
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
