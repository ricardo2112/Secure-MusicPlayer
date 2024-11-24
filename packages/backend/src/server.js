import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Map to store socketId and user data
const socketToUser = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Assign user data when a socket connects
  socket.on("setUserData", (userData) => {
    socketToUser.set(socket.id, userData);
  });

  // Listen for chat messages and broadcast them
  socket.on("chatMessage", (message) => {
    const user = socketToUser.get(socket.id);
    if (user) {
      io.emit("chatMessage", {
        text: message,
        userId: user.id,
        username: user.username,
        timestamp: new Date().toISOString(),
      });
    }
  });

  socket.on("disconnect", () => {
    socketToUser.delete(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
