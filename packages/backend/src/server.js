const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Dirección del frontend en desarrollo
    methods: ["GET", "POST"],
  },
});

// Datos quemados
const users = [
  { id: 1, name: "Juan", lastName: "Pérez" },
  { id: 2, name: "María", lastName: "López" },
];

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Asignar un usuario aleatorio al cliente
  const user = users[Math.floor(Math.random() * users.length)];
  console.log("Usuario asignado al cliente:", user);
  socket.emit("userInfo", user);

  // Escuchar y retransmitir mensajes
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", { text: message.text, user }); // Enviar usuario como objeto
  });

  // Evento de desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
