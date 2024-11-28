import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pedidos from "./components/Pedidos";
import "./App.css"; 

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Header />
        <div className="content">
          <Pedidos />
        </div>
      </main>
    </div>
  );
}

export default App;
