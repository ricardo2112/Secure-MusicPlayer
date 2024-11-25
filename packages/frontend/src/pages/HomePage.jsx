import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = ({ tab, setTab }) => {
  const { isAuthenticated, user, logout, loading } = useAuth();

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
            ¡Hola, <strong>{user.username}</strong>! Bienvenido de nuevo.
          </p>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setTab("player")}
              className={`px-4 py-2 rounded ${
                tab === "player" ? "bg-blue-800 text-white" : "bg-gray-300"
              }`}
            >
              Reproductor
            </button>
            <button
              onClick={() => setTab("comunidad")}
              className={`px-4 py-2 rounded ${
                tab === "comunidad" ? "bg-blue-800 text-white" : "bg-gray-300"
              }`}
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
