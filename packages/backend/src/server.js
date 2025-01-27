import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/mongodb.js";
import routes from "./routes/index.js";
import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();

const cspDirectives = {
  defaultSrc: ["'self'"], 
  scriptSrc: ["'self'"], 
  styleSrc: ["'self'"], 
  imgSrc: ["'self'", "data:", "https"],
  connectSrc: ["'self'"], 
  fontSrc: ["'self'"],
  objectSrc: ["'none'"], 
  frameAncestors: ["'none'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: [], 
};

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 150, 
  message: "Too many requests, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

app.disable("x-powered-by");

app.use(helmet());
app.use(helmet.frameguard({ action: "deny" }));
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);
app.use(helmet.noSniff());
app.use(
  helmet.contentSecurityPolicy({
    directives: cspDirectives,
  })
);

app.use(
  compression({
    filter: (req, res) => {
      if (req.path.includes("/auth") || req.path.includes("/login")) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// Middleware para manejar JSON, excluye métodos GET
app.use((req, res, next) => {
  if (req.method === "GET") return next(); // Salta express.json() para solicitudes GET
  express.json()(req, res, next); // Procesa JSON para otros métodos
});

app.use(sanitizeMiddleware);

// Configurar CORS dinámico
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173", // Origen local del frontend
        "http://localhost:3000", // Origen local del backend
        "https://secure-music-player.netlify.app", // Frontend en producción
        "https://secure-musicplayer.onrender.com", // Backend en producción
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Middlewares globales
app.use(cookieParser()); 

// Conexión a la base de datos
connectToDatabase();

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Para contenido dinámico o sensible
app.use((req, res, next) => {
  if (req.path.includes("/auth") || req.path.includes("/login")) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  next();
});

// Para contenido estático
app.use(express.static("public", {
  setHeaders: (res, path) => {
    res.set("Cache-Control", "public, max-age=31536000, immutable");
  },
}));

// Usar rutas
app.use(routes);

export default app;
