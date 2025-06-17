import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    nome: null,
    foto: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8800/user/me", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth({
            isAuthenticated: true,
            role: res.data.role,
            nome: res.data.nome,
            foto: res.data.foto,
          });
        } else {
          setAuth({
            isAuthenticated: false,
            role: null,
            nome: null,
            foto: null,
          });
        }
      })
      .catch(() => {
        setAuth({
          isAuthenticated: false,
          role: null,
          nome: null,
          foto: null,
        });
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
