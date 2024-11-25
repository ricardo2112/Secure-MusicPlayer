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

function App() {
  const [tab, setTab] = useState("player");

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<HomePage tab={tab} setTab={setTab} />} />

              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas protegidas */}
              <Route
                path="/musicplayer"
                element={
                  <ProtectedRoute
                    element={
                      tab === "player" ? <MusicPlayer /> : <Comunidad />
                    }
                  />
                }
              />

              {/* Ruta para páginas no encontradas */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
