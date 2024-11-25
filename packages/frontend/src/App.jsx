<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> develop
=======
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> 5e6442c598c0387be781bdc28993a858a0830a50
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MusicPlayer from "./pages/MusicPlayer";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5e6442c598c0387be781bdc28993a858a0830a50
import Comunidad from "./components/Comunity";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { PlaylistsProvider } from "./context/PlaylistsContext"; // Importar el proveedor

// Ruta protegida: Redirige al login si el usuario no está autenticado
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};
<<<<<<< HEAD
=======
import { ChatProvider } from "./context/ChatContext";
import { PlaylistsProvider } from "./context/PlaylistsContext"; // Importar el proveedor
>>>>>>> develop
=======
>>>>>>> 5e6442c598c0387be781bdc28993a858a0830a50

function App() {
  const [tab, setTab] = useState("player");

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5e6442c598c0387be781bdc28993a858a0830a50
    <AuthProvider>
      <ChatProvider>
        <PlaylistsProvider>
          <BrowserRouter>
            <div className="h-screen flex flex-col">
              <div className="bg-blue-600 text-white p-4">
                <h1 className="text-center text-xl font-bold">Music Application</h1>
              </div>

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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </PlaylistsProvider>
      </ChatProvider>
    </AuthProvider>
<<<<<<< HEAD
=======
    <ChatProvider>
      <PlaylistsProvider>
        <BrowserRouter>
          <div className="h-screen flex flex-col">
            <div className="bg-blue-600 text-white p-4">
              <h1 className="text-center text-xl font-bold">Music Application</h1>
            </div>

            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/musicplayer" element={<MusicPlayer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </PlaylistsProvider>
    </ChatProvider>
>>>>>>> develop
=======
>>>>>>> 5e6442c598c0387be781bdc28993a858a0830a50
  );
}

export default App;
