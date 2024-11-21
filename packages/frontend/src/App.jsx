import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MusicPlayer from "./pages/MusicPlayer";
import NotFound from "./pages/NotFound";
import Comunidad from "./components/Comunity";

function App() {
  const [tab, setTab] = useState("player");

  return (
    <BrowserRouter>
      {/* Navegación global */}
      <div className="h-screen flex flex-col">
        {/* Navegación entre tabs */}
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

        Rutas y contenido dinámico
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/musicplayer"
              element={
                tab === "player" ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold">¡Reproductor de música!</h1>
                    <p className="mt-4 text-lg">Aquí irá tu reproductor</p>
                  </div>
                ) : (
                  <Comunidad />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
