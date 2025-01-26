import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/mongodb.js";
import routes from "./routes/index.js";
import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";
import helmet from "helmet";
import compression from "compression";

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

app.use(express.json());
app.use(sanitizeMiddleware);

// Configurar CORS dinámico
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true, 
  })
);

// Middlewares globales
app.use(cookieParser()); 

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


export default app;
