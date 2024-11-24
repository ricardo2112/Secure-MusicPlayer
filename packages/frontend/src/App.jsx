import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MusicPlayer from "./pages/MusicPlayer";
import NotFound from "./pages/NotFound";
import { ChatProvider } from "./context/ChatContext"; // Importa el ChatProvider

function App() {
  return (
    <ChatProvider>
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
    </ChatProvider>
  );
}

export default App;
