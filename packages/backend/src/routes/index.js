import express from "express";
import musicRoutes from "./musicRoutes.js";
import playlistRoutes from "./playlistRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// Rutas principales
router.use("/api", musicRoutes);
router.use("/mymusic", playlistRoutes);
router.use("/auth", authRoutes); // Registrar rutas de autenticación

// Ruta por defecto
router.get("/", (req, res) => {
  res.send("Server is running");
});

export default router;
