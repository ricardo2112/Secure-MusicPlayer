import React, { createContext, useState, useEffect, useContext } from "react";
import { getTokens, storeTokens, clearTokens } from "../utils/indexedDB";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokens = async () => {
      const tokens = await getTokens();
      if (tokens) {
        const currentTime = new Date().getTime();
        const tokenLifetime = 30 * 24 * 60 * 60 * 1000; // 30 días
        if (currentTime - tokens.createdAt < tokenLifetime) {
          setIsAuthenticated(true);
        } else {
          await clearTokens();
        }
      }
    };
    checkTokens();
  }, []);

  const login = async (accessToken, refreshToken) => {
    await storeTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
