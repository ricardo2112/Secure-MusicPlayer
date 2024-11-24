import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Bienvenido a la aplicación</h1>
      <p className="mt-4 text-lg">Por favor, inicia sesión para continuar.</p>
      <Link
        to="/login"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
      >
        Ir al Login
      </Link>
    </div>
  );
};

export default HomePage;
