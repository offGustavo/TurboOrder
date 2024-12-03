import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import '../styles/Calendar.css';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedDia, setSelectedDia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [menu, setMenu] = useState({
    Segunda: [],
    Terça: [],
    Quarta: [],
    Quinta: [],
    Sexta: [],
    Sábado: [],
  });

  const produtos = [
    { id: 1, nome: 'Arroz Integral', tipo: 'Arroz', ativo: true },
    { id: 2, nome: 'Arroz Branco', tipo: 'Arroz', ativo: true },
    { id: 3, nome: 'Feijão Preto', tipo: 'Feijão', ativo: true },
    { id: 4, nome: 'Feijão Carioca', tipo: 'Feijão', ativo: false },
    { id: 5, nome: 'Macarrão', tipo: 'Massa', ativo: true },
    { id: 6, nome: 'Frango', tipo: 'Carne', ativo: true },
    { id: 7, nome: 'Salada Verde', tipo: 'Salada', ativo: true },
    { id: 8, nome: 'Batata Frita', tipo: 'Acompanhamento', ativo: true },
  ];

  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const openModal = (tipo, dia) => {
    setSelectedTipo(tipo);
    setSelectedDia(dia);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTipo(null);
    setSelectedDia(null);
    setShowModal(false);
  };

  const adicionarItem = (item) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      [selectedDia]: [...prevMenu[selectedDia], item],
    }));
    closeModal();
  };

  const removerItem = (dia, itemId) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      [dia]: prevMenu[dia].filter((item) => item.id !== itemId),
    }));
  };

  const renderModal = () => {
    if (!showModal) return null;

    const itensFiltrados = produtos.filter(
      (produto) => produto.tipo === selectedTipo && produto.ativo
    );

    return (
      <div style={styles.modal}>
        <h3>Adicionar {selectedTipo} para {selectedDia}</h3>
        {itensFiltrados.length > 0 ? (
          <ul>
            {itensFiltrados.map((item) => (
              <li key={item.id}>
                {item.nome}
                <button
                  onClick={() => adicionarItem(item)}
                  // style={styles.button}
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
        <button onClick={closeModal} style={styles.button}>
          Fechar
        </button>
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
              <div style={styles.cardsContainer} className="DayCard">
                {['Arroz', 'Feijão', 'Massa', 'Carne', 'Salada', 'Acompanhamento'].map((tipo) => (
                  <div key={tipo} style={styles.card}>
                    <p>{tipo}</p>
                    <ul>
                      {menu[dia]
                        .filter((item) => item.tipo === tipo)
                        .map((item) => (
                          <li key={item.id}>
                            {item.nome}
                            <button
                              onClick={() => removerItem(dia, item.id)}
                              className="clean-btn"
                            >
                              <FaMinus />
                            </button>
                          </li>
                        ))}
                    </ul>
                    <div className="add-container">
                      <button className="clean-btn" onClick={() => openModal(tipo, dia)}>
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

// Estilos inline
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    background: '#fff',
  },
  button: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
};
