import React from 'react';

const Favorites = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-primary to-contrast text-secondary">
      <h1 className="text-4xl font-extrabold mb-4">¡Tus canciones favoritas!</h1>
      <p className="text-lg text-center max-w-md">
        Estamos trabajando para que puedas guardar y acceder a tus canciones favoritas.
      </p>
      <p className="mt-2 text-center">Próximamente disponible</p>
      <div className="mt-8">
        <svg
          className="w-24 h-24 text-white animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Favorites;
