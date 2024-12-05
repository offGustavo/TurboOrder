import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import '../styles/Calendar.css';
import { FaMinus, FaPlus } from "react-icons/fa6";

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
    "Arroz": " #E8EFF0",
    "Feijão": "#F0E8ED",
    "Massa": "#EBE8F0",
    "Carne": "#E8F0E9",
    "Acompanhamento": "#FFF3F0",
    "Salada": "#F9E3E3",
  };

  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  useEffect(() => {
    fetch('/produtos?ativo=true')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  useEffect(() => {
    const dataAtual = value.format('YYYY-MM-DD');
    fetch(`/cardapios?data=${dataAtual}`)
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
    fetch(`/cardapios/dia?car_fk=${carId}`)
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
    fetch('/cardapios', {
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

    fetch('/cardapios/dia', {
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
    fetch(`/cardapios/dia/${itemId}`, {
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
  };

  const closeModal = () => {
    setSelectedTipo(null);
    setSelectedDia(null);
    setShowModal(false);
  };


const AlreadyRegistered = styled.button`
  height: auto;
  margin: 5px 15px;
  color: #fd1f4a;
  font-weight: bold;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #fd1f4a;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #fd1f4a;
    color: #ffffff;
  }
`;

  const renderModal = () => {
    if (!showModal) return null;

    const itensFiltrados = produtos.filter(
      (produto) => produto.pro_tipo === selectedTipo && produto.pro_ativo
    );

    return (
      <div style={{ ...styles.modal, top: modalPosition.top, left: modalPosition.left }}>
        <h3>Adicionar {selectedTipo} para {selectedDia}</h3>
        {itensFiltrados.length > 0 ? (
          <ul>
            {itensFiltrados.map((item) => (
              <li key={item.pro_id}>
                {item.pro_titulo}
                <button
                  onClick={() => adicionarItem(item)}
                  className="clean-btn"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há itens disponíveis para este tipo.</p>
        )}
        <div className="Container flex-end">
        <AlreadyRegistered onClick={closeModal} style={styles.button} className="clean-btn modal-btn">
            Fechar
          </AlreadyRegistered>
        </div>
      </div>
    );
  };


  return (
    <main>
      <h1>Cardápio Semanal</h1>
      <div style={styles.container} className="Container">
        <div className="CalendarContainer" style={{ marginBottom: '20px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
              <DemoItem label="">
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="Week">
          {diasDaSemana.map((dia) => (
            <div key={dia} className="WeekDay">
              <div className="WeekDay-Day"><h3>{dia}</h3></div>
              <div style={styles.cardsContainer} className="DayContainer">
                {tiposProdutos.map((tipo) => (
                  <div
                    key={tipo}
                    style={{
                      ...styles.card,
                      backgroundColor: cores[tipo]
                    }}
                    className="DayCard"
                  >
                    <p>{tipo}</p>
                    <ul>
                      {(menu[dia] || [])
                        .filter((item) => item.pro_tipo === tipo)
                        .map((item) => (
                          <li key={item.pro_id}>
                            {item.pro_titulo}
                            <button
                              onClick={() => removerItem(dia, item.pro_id)}
                              className="clean-btn "
                            >
                              <FaMinus />
                            </button>
                          </li>
                        ))}
                    </ul>
                    <div className="add-container btn-border-top">
                      <button className="clean-btn" onClick={(e) => openModal(tipo, dia, e)}>
                        Adicionar <FaPlus />
                      </button>
                    </div>
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

const styles = {
  container: {},
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {},
  modal: {
    position: 'absolute',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transform: 'none',
  },
};
