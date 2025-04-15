import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import '../styles/Calendar.css';
import '../styles/Global.css';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [produtos, setProdutos] = useState([]);
  const [menu, setMenu] = useState({});
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedProdutos, setSelectedProdutos] = useState({});

  const tiposProdutos = ["Arroz", "Feijão", "Massa", "Carne", "Acompanhamento", "Salada"];

  useEffect(() => {
    fetch('http://localhost:8800/produtos')
      .then((res) => res.json())
      .then((data) => {
        console.log("Produtos recebidos:", data);
        setProdutos(data);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  useEffect(() => {
    const dataAtual = currentDate.format('YYYY-MM-DD');
    fetch(`http://localhost:8800/cardapio?data=${dataAtual}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data || {});
      })
      .catch((err) => console.error('Erro ao carregar cardápio:', err));
  }, [currentDate]);

  const saveCardapio = () => {
    console.log("Cardápio salvo para", currentDate.format('YYYY-MM-DD'));
    console.log(selectedProdutos);
  }

  const printCardapio = () => {
    console.log(currentDate.format('YYYY-MM-DD'));
  }

  const showAddMenu = (tipo) => {
    setSelectedTipo(tipo);
  }

  const addProductToMenu = (produto) => {
    setSelectedProdutos(prev => ({
      ...prev,
      [selectedTipo]: [...(prev[selectedTipo] || []), produto]
    }));
  }

  const removeProductFromMenu = (tipo, index) => {
    setSelectedProdutos(prev => {
      const updatedList = [...(prev[tipo] || [])];
      updatedList.splice(index, 1);
      return {
        ...prev,
        [tipo]: updatedList,
      };
    });
  }

  return (
    <main>
      <div className="header-product-list">
        <h1 className='title'>Cardápio Diário</h1>
        <div className="header-product-list-buttons">
          <button className="btn-add" onClick={saveCardapio}> Salvar</button>
          <button className="btn-add" onClick={printCardapio}> Gerar Cardápio</button>
        </div>
      </div>
      <div className="container">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar currentDate={currentDate} onChange={(newValue) => setCurrentDate(newValue)} />
          </LocalizationProvider>
        </div>

        <div className="product-list">
          <h2 className='day-header'>Produtos para {currentDate.format('DD/MM/YYYY')}</h2>
          <ul className="product-list-ul">
            {tiposProdutos.map((tipo) => (
              <li key={tipo} className="product-list-li">
                <h3>{tipo}</h3>
                <ul>
                  {(selectedProdutos[tipo] || []).map((produto, index) => (
                    <li key={index} className="product-list-li-decoration">
                      {produto.pro_nome}
                      <button className="calendar-remove-btn" onClick={() => removeProductFromMenu(tipo, index)}>-</button>
                    </li>
                  ))}
                </ul>
                <button className="calendar-add-btn" onClick={() => showAddMenu(tipo)}>Adicionar +</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedTipo && (
        <div className="modal">
          <h3>Adicionar produto para {selectedTipo}</h3>
          {/* TODO: Confirmar a palavra mantimentos  */}
          <input className='calendar-search-produtos' placeholder='Pesquisar Mantimentos...' type="text" />
          <div className='modal-list-container'>
            <ul className='calendar-ul-produtos'>
              {produtos.filter(produto => produto.pro_tipo === selectedTipo && !(selectedProdutos[selectedTipo] || []).some(p => p.pro_id === produto.pro_id)).map(produto => (
                <li key={produto.pro_id}>
                  {produto.pro_nome} <button onClick={() => addProductToMenu(produto)} className='btn-add calendar-add-btn'>Adicionar</button>
                </li>
              ))}
            </ul>
          </div>
          <button className='calendar-close-btn' onClick={() => setSelectedTipo(null)}>Fechar</button>
        </div>
      )}
    </main>
  );
}
