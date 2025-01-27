import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Carga la URL base del backend desde las variables de entorno
const BACKEND_API_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para las solicitudes API y socket.io
      "/auth": {
        target: BACKEND_API_URL, // Usa VITE_API_BASE_URL
        changeOrigin: true, // Ajusta el origen para evitar problemas de CORS
        secure: BACKEND_API_URL.startsWith("https"), // Detecta si el backend usa HTTPS
      },
      "/socket.io": {
        target: BACKEND_API_URL, // También usa VITE_API_BASE_URL para WebSockets
        ws: true, // Soporte para WebSocket
        changeOrigin: true,
      },
    },
  },
});
