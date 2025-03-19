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

  const tiposProdutos = ["Arroz", "Feijão", "Massa", "Carne", "Acompanhamento", "Salada"];
  // setProdutos(
  //   { 'id': 1, 'nome': 'Arroz Soltinho', 'tipo': 'Arroz' },
  //   { 'id': 2, 'nome': 'Arroz Integral', 'tipo': 'Arroz' },
  //   { 'id': 3, 'nome': 'Arroz Jasmim', 'tipo': 'Arroz' },
  //   { 'id': 4, 'nome': 'Arroz Negro', 'tipo': 'Arroz' },
  //   { 'id': 5, 'nome': 'Arroz Vermelho', 'tipo': 'Arroz' },
  //   { 'id': 6, 'nome': 'Feijão Preto', 'tipo': 'Feijão' },
  //   { 'id': 7, 'nome': 'Feijão Carioca', 'tipo': 'Feijão' },
  //   { 'id': 8, 'nome': 'Feijão Feijoada', 'tipo': 'Feijão' },
  //   { 'id': 9, 'nome': 'Feijão Tropeiro', 'tipo': 'Feijão' },
  //   { 'id': 10, 'nome': 'Feijão Tutu', 'tipo': 'Feijão' },
  //   { 'id': 11, 'nome': 'Massa Espaguete', 'tipo': 'Massa' },
  //   { 'id': 12, 'nome': 'Massa Talharim', 'tipo': 'Massa' },
  //   { 'id': 13, 'nome': 'Massa Penne', 'tipo': 'Massa' },
  //   { 'id': 14, 'nome': 'Massa Ravioli', 'tipo': 'Massa' },
  //   { 'id': 15, 'nome': 'Massa Fusilli', 'tipo': 'Massa' },
  //   { 'id': 16, 'nome': 'Salada Caesar', 'tipo': 'Salada' },
  //   { 'id': 17, 'nome': 'Salada Tropical', 'tipo': 'Salada' },
  //   { 'id': 18, 'nome': 'Salada Caprese', 'tipo': 'Salada' },
  //   { 'id': 19, 'nome': 'Salada Verde', 'tipo': 'Salada' },
  //   { 'id': 20, 'nome': 'Salada De Frutas', 'tipo': 'Salada' },
  //   { 'id': 21, 'nome': 'Acompanhamento Batata Frita', 'tipo': 'Acompanhamento' },
  //   { 'id': 22, 'nome': 'Acompanhamento Purê de Batata', 'tipo': 'Acompanhamento' },
  //   { 'id': 23, 'nome': 'Acompanhamento Farofa', 'tipo': 'Acompanhamento' },
  //   { 'id': 24, 'nome': 'Acompanhamento Vinagrete', 'tipo': 'Acompanhamento' },
  //   { 'id': 25, 'nome': 'Acompanhamento Legumes Salteados', 'tipo': 'Acompanhamento' },
  //   { 'id': 26, 'nome': 'Carne Bife', 'tipo': 'Carne' },
  //   { 'id': 27, 'nome': 'Carne Frango Grelhado', 'tipo': 'Carne' },
  //   { 'id': 28, 'nome': 'Carne Costela', 'tipo': 'Carne' },
  //   { 'id': 29, 'nome': 'Carne Picanha', 'tipo': 'Carne' },
  //   { 'id': 30, 'nome': 'Carne Carne Moída', 'tipo': 'Carne' }
  // );
  // console.log("Produtos:")
  // console.log(produtos)

  useEffect(() => {
    fetch('http://localhost:8800/produtos')
      .then((res) => res.json())
      .then((data) => {
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


  // NOTE: Temporario
  const saveCardapio = () => {
    console.log("Salvo!!!")
  }
  const printCardapio = () => {
    console.log("Copiado!!!")
  }
  const showAddMenu = (tipo) => {
    console.log("Show Modal Tipo" + tipo +  "!!!")
  }

  return (
    <main>
      <div className="header-product-list"> 
        <h1 className='title'>Cardápio Diário</h1>
        <div className="header-product-list-buttons ">
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
            {/* TODO: Adiconar a escolha de produtos pro dia ao cardapio  */}
            {/* TODO: Estilizar a lista de cardapio  */}
            {/*TODO: Fazer um filtro pelos tipos de produto*/}
            {tiposProdutos.map((tipo) => (
              <li key={tipo} className="product-list-li">
                <h3>{tipo}</h3>
                <li> * Arroz Sotinho -</li>
                <li> * Arroz Rosa -</li>
                {/* NOTE: Aqui deve ser feito o filtro do tipo do produto */}
                {/* FIXME: Botão não está ativando a função ao clicar */}
                <button className="btn-add" onClick={showAddMenu(tipo)}>Adcionar +</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
