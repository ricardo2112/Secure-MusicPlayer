import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar si el token está presente en el encabezado
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado o inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = { userId: decoded.userId }; // Asignar el userId al objeto req
    next(); // Continuar con el siguiente middleware
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export default verifyToken;
