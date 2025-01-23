import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Token desde cookie o header
    console.log("Token recibido:", token);

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_JWT_KEY); // Verifica el token
        req.user = decoded; // Agrega el usuario al objeto `req` para usarlo en las rutas protegidas
        next(); // Continúa hacia la siguiente función o ruta
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

export default verifyToken;
