import React, { createContext, useState, useEffect, useContext } from "react";
import { getTokens, storeTokens, clearTokens } from "../utils/indexedDB";
import { API_URL } from "../utils/api";

export const AuthContext = createContext(); // Exportar el contexto directamente

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Guarda el token aquí para compartirlo con otros contextos

  useEffect(() => {
    const checkTokens = async () => {
      setLoading(true);
      const tokens = await getTokens();
      if (tokens) {
        const currentTime = new Date().getTime();
        const tokenLifetime = 30 * 24 * 60 * 60 * 1000; // 30 días

        if (currentTime - tokens.createdAt < tokenLifetime) {
          try {
            const response = await fetch(`${API_URL}/verify-token`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });

            if (!response.ok) {
              throw new Error("Token inválido o expirado");
            }

            const userData = await response.json();
            setIsAuthenticated(true);
            setUser(userData);
            setToken(tokens.accessToken); // Guarda el token
          } catch (error) {
            console.error("Error al verificar el token:", error.message);
            await clearTokens();
            setIsAuthenticated(false);
            setUser(null);
            setToken(null); // Limpia el token
          }
        } else {
          await clearTokens();
        }
      }
      setLoading(false);
    };

    checkTokens();
  }, []);

  const login = async (accessToken, refreshToken, userData) => {
    setLoading(true);
    await storeTokens(accessToken, refreshToken);
    setToken(accessToken); // Guarda el token
    setIsAuthenticated(true);
    setUser(userData);
    setLoading(false);
  };

  const logout = async () => {
    await clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null); // Limpia el token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
