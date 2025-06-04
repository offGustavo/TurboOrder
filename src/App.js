import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./styles/Global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar.js";
import Header from "./components/Header.js";
import ProductTable from "./pages/ProductTable.js";
import Home from "./pages/Home.js";
import AddClient from "./pages/AddClient.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Calendar from "./pages/Calendar.js";
import AddOrder from "./pages/AddOrder.js";
import ClientTable from "./pages/ClientTable.js";
import EditClient from "./pages/EditClient.js";
import Historico from "./pages/Historico.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";

function App() {
  
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  axios.defaults.withCredentials = true;

  const checkAuth = () => {
    axios
      .get("http://localhost:8800")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUsername(res.data.username);
        } else {
          setAuth(false);
          setUsername("");
        }
      })
      .catch(() => {
        setAuth(false);
        setUsername("");
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/cadastro" element={<Register />} />

          {auth ? (
            <Route
              path="*"
              element={
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
                            <ProductTable
                              products={products}
                              setProducts={setProducts}
                            />
                          }
                        />
                        <Route
                          path="/cadastro-de-cliente"
                          element={<AddClient />}
                        />
                        <Route path="/cardapio" element={<Calendar />} />
                        <Route
                          path="/cadastro-de-cliente/pedidos"
                          element={<AddOrder />}
                        />
                        <Route path="/clientes" element={<ClientTable />} />
                        <Route
                          path="/clientes/:id/edit"
                          element={<EditClient />}
                        />
                        <Route path="/historico" element={<Historico />} />
                        <Route path="*" element={<div>Página não encontrada</div>} />
                      </Routes>
                    </div>
                  </main>
                  <ToastContainer position="bottom-left" autoClose={3000} />
                </div>
              }
            />
          ) : (
            <Route
              path="*"
              element={
                <div className="login-prompt">
                  <h3>Faça login para acessar o sistema</h3>
                  <Link to="/login">Ir para Login</Link>
                </div>
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;