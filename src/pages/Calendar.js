import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import '../styles/Calendar.css';

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const [produtos, setProdutos] = useState([]);
  const [menu, setMenu] = useState({});

  const tiposProdutos = ["Arroz", "Feijão", "Massa", "Carne", "Acompanhamento", "Salada"];

  useEffect(() => {
    fetch('http://localhost:8800/produtos')
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  useEffect(() => {
    const dataAtual = value.format('YYYY-MM-DD');
    fetch(`http://localhost:8800/cardapio?data=${dataAtual}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data || {});
      })
      .catch((err) => console.error('Erro ao carregar cardápio:', err));
  }, [value]);

  return (
    <main>
        <h1 className='title'>Cardápio Diário</h1>
        <div className="container">
          <div className="calendar-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
            </LocalizationProvider>
          </div>

          <div className="product-list">
            <h2 className='day-header'>Produtos para {value.format('DD/MM/YYYY')}</h2>
            <ul>
              {/* TODO: Adiconar a escolha de produtos pro dia ao cardapio  */}
              {/* TODO: Estilizar a lista de cardapio  */}
              {tiposProdutos.map((tipo) => (
                <li key={tipo}>{tipo}</li>
              ))}
            </ul>
          </div>
        </div>
    </main>
  );
}
