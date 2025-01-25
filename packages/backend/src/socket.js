import { Server } from "socket.io";
import xss from "xss";

const socketToUser = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log(`User connected`);

    // Manejar datos del usuario
    socket.on("setUserData", (userData) => {
      if (!userData || typeof userData.username !== "string" || userData.username.length > 50) {
        console.log(`Invalid userData received`);
        return;
      }
      socketToUser.set(socket.id, { username: userData.username });
    });

    // Manejar mensajes de chat
    socket.on("chatMessage", (message) => {
      // Sanitizar el mensaje
      const sanitizedMessage = xss(message, {
        whiteList: {}, // Permitir solo texto plano
      });

      // Validar longitud del mensaje
      if (!sanitizedMessage || sanitizedMessage.length > 200) {
        console.log(`Invalid message received`);
        socket.emit("errorMessage", "Message is invalid or too long.");
        return;
      }

      const user = socketToUser.get(socket.id);
      if (user) {
        const chatMessage = {
          text: sanitizedMessage,
          username: user.username,
          timestamp: new Date().toISOString(),
        };
        io.emit("chatMessage", chatMessage); // Difundir el mensaje a todos
      }
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      socketToUser.delete(socket.id);
      console.log(`User disconnected`);
    });
  });

  // Manejar errores globales de WebSocket
  io.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  return io;
};

export default initializeSocket;
