import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from "./components/Sidebar.js";
import Header from "./components/Header.js";
import ProductTable from "./pages/ProductTable.js";
import Dashboard from "./pages/Dashboard.js";
import AddCliente  from "./pages/AddCliente.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Calendar from "./pages/Calendar.js";
import AddOrder from "./pages/AddOrder.js";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main>
          <Header />
          <Breadcrumb />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<ProductTable products={products} setProducts={setProducts} />} />
              <Route path="*" element={<div>Página não encontrada</div>} />
              <Route path="/cadastro-de-cliente" element={<AddCliente />} />
              <Route path="/cardapio" element={<Calendar />} />
              <Route path="/pedidos" element={<AddOrder />} />
              <Route path="/clientes" element={<AddCliente /> } />
            </Routes>
          </div>
        </main>
        <ToastContainer position="bottom-left" autoClose={3000} />
      </div>

    </Router>

  );
}

export default App;
