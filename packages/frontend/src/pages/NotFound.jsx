import React from 'react';
import guyChill from '../assets/guyChill.png'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary text-white">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Página no encontrada</h2>
      <p className="text-lg text-center max-w-md mb-6">
        Lo sentimos, pero la página que estás buscando no existe. Revisa la URL o vuelve a la página principal.
      </p>
      <a
        href="/"
        className="px-6 py-2 text-lg text-black bg-contrast hover:bg-contrast2 hover:text-white rounded-lg transition-all"
      >
        Volver al inicio
      </a>
      <div className="mt-8">
        <img
          src={guyChill}
          alt="Not Found"
          className="rounded-lg shadow-lg h-80 w-80 object-cover"
        />
      </div>
    </div>
  );
};

export default NotFound;
