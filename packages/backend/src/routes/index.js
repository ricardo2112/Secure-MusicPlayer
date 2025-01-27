import express from "express";
import cors from "cors";
import musicRoutes from "./musicRoutes.js";
import playlistRoutes from "./playlistRoutes.js";
import authRoutes from "./authRoutes.js";
import subscriptionRoutes from "./subscriptionRoutes.js";

const router = express.Router();

// Configura CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: "http://localhost:5173", // Dirección de tu frontend
  credentials: true, // Permitir cookies si es necesario
};
router.use(cors(corsOptions));

// Prefijo global para rutas API
router.use("/api", musicRoutes);
router.use("/playlists", playlistRoutes);
router.use("/auth", authRoutes); 
router.use("/subscriptions", subscriptionRoutes); // Ruta para manejar 

// Ruta por defecto
router.get("/", (req, res) => {
  res.send("Server is running");
});

export default router;
