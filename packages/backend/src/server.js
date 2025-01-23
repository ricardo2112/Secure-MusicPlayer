import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/mongodb.js";
import routes from "./routes/index.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Conexión a la base de datos
connectToDatabase();

// Usar rutas
app.use(routes);

export default app;
