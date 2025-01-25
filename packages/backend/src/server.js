import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/mongodb.js";
import routes from "./routes/index.js";
import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";

const app = express();
app.use(express.json()); // Sólo una vez está bien
app.use(sanitizeMiddleware); // Aplicar middleware global

// Configurar CORS dinámico
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Permitir solicitudes desde el frontend
    credentials: true, // Permitir cookies
  })
);

// Middlewares globales
app.use(cookieParser()); // Sólo esta línea

// Conexión a la base de datos
connectToDatabase();

// Usar rutas
app.use(routes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

export default app;
