// src/context/authContext.jsx

"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Cria o contexto
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Carrega token e usuário do localStorage ao iniciar
  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (tokenSalvo && usuarioSalvo) {
      setToken(tokenSalvo);
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  // Função para fazer login (chama o backend, guarda token e usuário)
  const login = ({ token, usuario }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado
export function useAuth() {
  return useContext(AuthContext);
}
