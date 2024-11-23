import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Dirección del servidor backend
const socket = io("http://localhost:3000");

const Comunidad = () => {
  const [message, setMessage] = useState(""); // Mensaje actual
  const [chat, setChat] = useState([]); // Historial del chat
  const [user, setUser] = useState(null); // Información del usuario

  // Conexión al servidor y eventos de socket.io
  useEffect(() => {
    console.log("Conexión al servidor:", socket.connected);

    // Recibir información del usuario desde el backend
    socket.on("userInfo", (userInfo) => {
      console.log("Usuario recibido desde el servidor:", userInfo);
      setUser(userInfo);
    });

    // Recibir mensajes entrantes
    socket.on("chatMessage", (msg) => {
      console.log("Mensaje recibido:", msg);
      setChat((prev) => [...prev, { ...msg, isCurrentUser: msg.user.id === user?.id }]);
    });

    // Limpiar listeners al desmontar el componente
    return () => {
      socket.off("userInfo");
      socket.off("chatMessage");
    };
  }, [user]);

  // Enviar un mensaje al backend
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { text: message, user: user }); // Enviar usuario también
      setMessage(""); // Limpia el campo de entrada
    }
  };

  // Manejo de la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el comportamiento predeterminado
      sendMessage();
    }
  };

  // Renderizado del componente
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Nombre del usuario */}
      {user && (
        <div className="p-4 bg-blue-500 text-white text-center">
          {`Bienvenido ${user.name} ${user.lastName}`}
        </div>
      )}

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg shadow max-w-xs ${
                msg.isCurrentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="font-semibold">
                {msg.isCurrentUser ? "Tú" : msg.user.name}:
              </div>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Campo de entrada de mensajes */}
      <div className="p-4 bg-white shadow flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded p-2"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Manejar tecla Enter
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Comunidad;