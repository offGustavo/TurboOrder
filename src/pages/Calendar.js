import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { FaMinus, FaPlus } from "react-icons/fa6";
import '../styles/Calendar.css';

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedDia, setSelectedDia] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [menu, setMenu] = useState({});
  const [currentCardapio, setCurrentCardapio] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const tiposProdutos = [
    "Arroz",
    "Feijão",
    "Massa",
    "Carne",
    "Acompanhamento",
    "Salada",
  ];

  const cores = {
    Arroz: "#E8EFF0",
    Feijão: "#F0E8ED",
    Massa: "#EBE8F0",
    Carne: "#E8F0E9",
    Acompanhamento: "#FFF3F0",
    Salada: "#F9E3E3",
  };

  const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  useEffect(() => {
    fetch('http://localhost:8800/produtos')
      .then((res) => res.json())
      .then((data) => {
        console.log("Produtos carregados:", data);
        setProdutos(data);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  useEffect(() => {
    const dataAtual = value.format('YYYY-MM-DD');
    fetch(`http://localhost:8800/cardapio?data=${dataAtual}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCurrentCardapio(data);
          carregarMenu(data.car_id);
        } else {
          criarCardapio(dataAtual);
        }
      })
      .catch((err) => console.error('Erro ao carregar cardápio:', err));
  }, [value]);

  const carregarMenu = (carId) => {
    fetch(`http://localhost:8800/cardapio/dia?car_fk=${carId}`)
      .then((res) => res.json())
      .then((data) => {
        const novoMenu = diasDaSemana.reduce((acc, dia) => {
          acc[dia] = data.filter((item) => item.dia_dia === dia);
          return acc;
        }, {});
        setMenu(novoMenu);
      })
      .catch((err) => console.error('Erro ao carregar menu:', err));
  };

  const criarCardapio = (data) => {
    fetch('http://localhost:8800/cardapio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ car_data: data }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentCardapio(data);
        setMenu({});
      })
      .catch((err) => console.error('Erro ao criar cardápio:', err));
  };

  const adicionarItem = (item) => {
    if (!currentCardapio) return;

    const novoItem = {
      pro_fk: item.pro_id,
      car_fk: currentCardapio.car_id,
      dia_dia: selectedDia,
    };

    fetch('http://localhost:8800/cardapio/dia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoItem),
    })
      .then(() => {
        setMenu((prevMenu) => ({
          ...prevMenu,
          [selectedDia]: [...(prevMenu[selectedDia] || []), item],
        }));
        closeModal();
      })
      .catch((err) => console.error('Erro ao adicionar item:', err));
  };

  const removerItem = (dia, itemId) => {
    fetch(`http://localhost:8800/cardapio/dia/${itemId}`, { 
      method: 'DELETE',
    })
      .then(() => {
        setMenu((prevMenu) => ({
          ...prevMenu,
          [dia]: prevMenu[dia].filter((item) => item.pro_id !== itemId),
        }));
      })
      .catch((err) => console.error('Erro ao remover item:', err));
  };

  const openModal = (tipo, dia, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.bottom + window.scrollY + 10,
      left: buttonRect.left + window.scrollX,
    });
    setSelectedTipo(tipo);
    setSelectedDia(dia);
    setShowModal(true);
    
    console.log('Tipo selecionado:', tipo);
  };

  const closeModal = () => {
    setSelectedTipo(null);
    setSelectedDia(null);
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const itensFiltrados = produtos.filter(
      (produto) => produto.pro_tipo === selectedTipo && produto.pro_ativo === 1
    );

    console.log('Itens filtrados:', itensFiltrados);

    return (
      <div className="modal" style={{ top: modalPosition.top, left: modalPosition.left }}>
        <h3>Adicionar {selectedTipo} para {selectedDia}</h3>
        {itensFiltrados.length > 0 ? (
          <ul>
            {itensFiltrados.map((item) => (
              <li key={item.pro_id}>
                {item.pro_nome}
                <button onClick={() => adicionarItem(item)} className="add-btn">
                  +
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há itens disponíveis para este tipo.</p>
        )}
        <button onClick={closeModal} className="close-btn">
          Fechar
        </button>
      </div>
    );
  };

  return (
    <main>
      <h1 className='title'>Cardápio Semanal</h1>
      <div className="container">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
              <DemoItem>
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="week">
          {diasDaSemana.map((dia) => (
            <div key={dia} className="weekday">
              <h3>{dia}</h3>
              <div className="day-container">
                {tiposProdutos.map((tipo) => (
                  <div key={tipo} className="day-card" style={{ backgroundColor: cores[tipo] }}>
                    <p>{tipo}</p>
                    <ul>
                      {(menu[dia] || [])
                        .filter((item) => item.pro_tipo === tipo)
                        .map((item) => (
                          <li key={item.pro_id}>
                            {item.pro_nome}
                            <button onClick={() => removerItem(dia, item.pro_id)} className="remove-btn">
                              <FaMinus />
                            </button>
                          </li>
                        ))}
                    </ul>
                    <button className="add-btn" onClick={(e) => openModal(tipo, dia, e)}>
                      Adicionar <FaPlus />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {renderModal()}
      </div>
    </main>
  );
}
