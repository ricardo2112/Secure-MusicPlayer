import express from "express";
import { login, register, verifyToken, refreshAccessToken } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiter para /auth/login
const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 5, 
    message: "Too many login attempts, please try again after 5 minutes.",
  });
  
  // Rate limiter para /auth/refresh-token
  const refreshTokenLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
    message: "Too many refresh attempts, please try again after 15 minutes.",
  });

// Ruta para registrar un usuario
router.post("/register", register);

// Ruta para verificar el token
router.get("/verify-token", verifyToken);

router.post("/login", loginLimiter, login);
router.post("/refresh-token", refreshTokenLimiter, refreshAccessToken);

export default router;
