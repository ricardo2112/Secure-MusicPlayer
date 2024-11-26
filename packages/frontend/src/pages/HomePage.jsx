import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary text-white text-xl">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-secondary text-white">
      <div className="max-w-lg p-6 rounded-lg bg-primary shadow-lg text-center">
        <h1 className="text-4xl text-white mb-4 font-fugaz">
          Bienvenido a Music Vibes
        </h1>
        <p className="text-lg text-white mb-6">
          Descubre tus canciones favoritas, explora comunidades y lleva tu
          música donde quieras.
        </p>
        {!isAuthenticated ? (
          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              className="px-6 py-3 text-lg font-bold text-white bg-contrast2 rounded-lg hover:bg-white hover:text-contrast transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-lg text-white mb-4">
              ¡Hola, <strong>{user?.username || "Usuario"}</strong>! 🎵
            </p>
            <button
              onClick={() => navigate("/musicplayer")}
              className="px-6 py-3 text-lg font-bold text-white bg-contrast2 rounded-lg hover:bg-white hover:text-contrast2 transition"
            >
              Ir al Reproductor
            </button>
            <button
              onClick={logout}
              className="px-6 py-3 text-lg font-bold text-white bg-contrast2 rounded-lg hover:bg-white hover:text-contrast2 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
