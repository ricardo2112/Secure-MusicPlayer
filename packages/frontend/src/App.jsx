import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MusicPlayer from "./pages/MusicPlayer";
import NotFound from "./pages/NotFound";
import Comunidad from "./components/Comunity";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Ruta protegida: Redirige a HomePage si el usuario no está autenticado
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const AppContent = () => {
  const [tab, setTab] = useState("player");
  const { isAuthenticated } = useAuth(); // Ahora seguro porque AppContent está envuelto por AuthProvider

  return (
    <div className="h-screen flex flex-col">
      {/* Navegación global */}
      {isAuthenticated && (
        <div className="bg-blue-600 text-white flex justify-around p-4">
          <button
            onClick={() => setTab("player")}
            className={`px-4 py-2 rounded ${
              tab === "player" ? "bg-blue-800" : "bg-blue-500"
            }`}
          >
            Reproductor
          </button>
          <button
            onClick={() => setTab("comunidad")}
            className={`px-4 py-2 rounded ${
              tab === "comunidad" ? "bg-blue-800" : "bg-blue-500"
            }`}
          >
            Comunidad
          </button>
        </div>
      )}

      {/* Rutas y contenido dinámico */}
      <div className="flex-1">
        <Routes>
          {/* Ruta de inicio: Siempre muestra HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route
            path="/musicplayer"
            element={
              <ProtectedRoute
                element={
                  tab === "player" ? (
                    <MusicPlayer />
                  ) : (
                    <Comunidad />
                  )
                }
              />
            }
          />

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
