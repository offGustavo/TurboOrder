import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";

import "./App.css";
import "./styles/Global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductTable from "./pages/ProductTable";
import Home from "./pages/Home";
import AddClient from "./pages/AddClient";
import Breadcrumb from "./components/Breadcrumb";
import Calendar from "./pages/Calendar";
import AddOrder from "./pages/AddOrder";
import ClientTable from "./pages/ClientTable";
import EditClient from "./pages/EditClient";
import Historico from "./pages/Historico";
import Login from "./pages/Login";
import EmployeeManagement from "./pages/EmployeeManagement";
import EditProfile from "./pages/EditProfile";

import { AuthProvider, AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.role !== role) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return children;
}

function AppContent() {
  const { auth, setAuth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");

  axios.defaults.withCredentials = true;

  const checkAuth = () => {
  axios
    .get("http://localhost:8800/user/me")
    .then((res) => {
      if (res.data && res.data.nome) {
        setAuth({
          isAuthenticated: true,
          role: res.data.role,
          nome: res.data.nome,
          email: res.data.email,
          foto: res.data.foto,
        });
        setUsername(res.data.nome);
      } else {
        setAuth({ isAuthenticated: false, role: null });
        setUsername("");
      }
    })
    .catch(() => {
      setAuth({ isAuthenticated: false, role: null });
      setUsername("");
    });
};

  useEffect(() => {
    checkAuth();
  }, []);

  if (!auth.isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route
          path="*"
          element={
            <div>
              <div className="login-prompt">
              <div>
                <h3 className="text-loginPrompt">Faça login para acessar o sistema</h3>
                <Link to="/login" className="btn-loginPrompt">Ir para Login</Link>
              </div>
              </div>
            </div>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Sidebar />
      <main>
        <Header />
        <Breadcrumb />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/produtos"
              element={
                <ProductTable products={products} setProducts={setProducts} />
              }
            />
            <Route path="/cadastro-de-cliente" element={<AddClient />} />
            <Route path="/cardapio" element={<Calendar />} />
            <Route path="/cadastro-de-cliente/pedidos" element={<AddOrder />} />
            <Route path="/clientes" element={<ClientTable />} />
            <Route path="/clientes/:id/edit" element={<EditClient />} />
            <Route path="/perfil" element={<EditProfile />} />
            <Route
              path="/historico"
              element={
                <ProtectedRoute role="admin">
                  <Historico />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funcionarios"
              element={
                <ProtectedRoute role="admin">
                  <EmployeeManagement />
                </ProtectedRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/redefinir-senha" element={<ResetPassword />} />
            <Route path="*" element={<div>Página não encontrada</div>} />
          </Routes>
        </div>
      </main>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
