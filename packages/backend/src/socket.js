import { Server } from "socket.io";

const socketToUser = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("setUserData", (userData) => {
      socketToUser.set(socket.id, { username: userData.username });
      console.log(`User data set for socket ${socket.id}:`, socketToUser.get(socket.id));
    });

    socket.on("chatMessage", (message) => {
      const user = socketToUser.get(socket.id);
      if (user) {
        const chatMessage = {
          text: message,
          username: user.username,
          timestamp: new Date().toISOString(),
        };
        io.emit("chatMessage", chatMessage);
      }
    });

    socket.on("disconnect", () => {
      socketToUser.delete(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initializeSocket;
