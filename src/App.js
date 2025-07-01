import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from "react-router-dom";

import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./styles/Global.css";

import { toast } from "react-toastify";
import Breadcrumb from "./components/Breadcrumb";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import AddClient from "./pages/AddClient";
import AddOrder from "./pages/AddOrder";
import Calendar from "./pages/Calendar";
import ClientTable from "./pages/ClientTable";
import Desempenho from "./pages/Desempenho"; // Importar a página de desempenho
import EditClient from "./pages/EditClient";
import EmployeeManagement from "./pages/EmployeeManagement";
import Historico from "./pages/Historico";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductTable from "./pages/ProductTable";

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
      .get("http://localhost:8800")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth({ isAuthenticated: true, role: res.data.role });
          setUsername(res.data.username);
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

  useEffect(() => {
    axios
      .get("http://localhost:8800/produtos")
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Erro ao buscar produtos."));
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
            <Route path="/desempenho" element={<Desempenho products={products} />} />
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
