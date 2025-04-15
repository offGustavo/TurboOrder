import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
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
        if (data && data.length > 0) {
          // Converte a lista de produtos para o formato { tipo: [produtos] }
          const agrupado = {};

          data.forEach((produto) => {
            const tipo = produto.pro_tipo;
            if (!agrupado[tipo]) {
              agrupado[tipo] = [];
            }
            agrupado[tipo].push(produto);
          });

          setSelectedProdutos(agrupado);
        } else {
          setSelectedProdutos({});
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar cardápio:', err);
        setSelectedProdutos({});
      });
  }, [currentDate]);

  const saveCardapio = () => {
    const dataAtual = currentDate.format('YYYY-MM-DD');

    const produtosParaSalvar = [];
    Object.keys(selectedProdutos).forEach(tipo => {
      selectedProdutos[tipo].forEach(produto => {
        produtosParaSalvar.push({ pro_id: produto.pro_id, pro_tipo: tipo });
      });
    });

    fetch('http://localhost:8800/cardapio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: dataAtual,
        produtos: produtosParaSalvar
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        alert("Cardápio salvo com sucesso!");
      })
      .catch(err => {
        console.error("Erro ao salvar cardápio:", err);
        alert("Erro ao salvar cardápio");
      });
  };
  ;

  const printCardapio = () => {
    const data = currentDate.format('DD/MM/YYYY');

    const tipos = {
      Arroz: "Arroz",
      Feijão: "Feijão",
      Carne: "Carnes",
      Massa: "Massas",
      Acompanhamento: "Acompanhamentos",
      Salada: "Salada"
    };

    const getProdutosPorTipo = (tipo) => {
      const lista = selectedProdutos[tipo] || [];
      return lista.map((p) => p.pro_nome).join("\n");
    };

    // const produtoIndiponivel = "Nenhum "

    //FIXME: Modificar texto de nenhum poroduto disponível no dia
    const cardapioTexto = `
Bom dia, cardápio do dia 😁 🍴

*ESTAMOS ENTREGANDO NORMALMENTE! TAXA DE ENTREGA É 3,00*

*Marmitex com uma carne 20,00$ e com duas carnes 22,00$*

- *Escolha uma opção de:*
${getProdutosPorTipo("Arroz") || "nenhum arroz disponivel para hoje"}

- *Escolha uma opção de:*
${getProdutosPorTipo("Feijão") || "nenhum arroz disponivel para hoje"}

- *Carnes* *1 ou 2 opções:*
${getProdutosPorTipo("Carne") || "nenhum arroz disponivel para hoje"}

- *Massas:* *1 opção:*
${getProdutosPorTipo("Massa") || "nenhum arroz disponivel para hoje"}

- *Acompanhamentos:* *1 opção:*
${getProdutosPorTipo("Acompanhamento") || "nenhum arroz disponivel para hoje"}

- *Salada:* *1 ou 2 opções:*
${getProdutosPorTipo("Salada") || "nenhum arroz disponivel para hoje"}

*POR FAVOR*: Ao finalizar seu pedido peço para que coloque junto seu *nome e horário para retirada ou endereço de entrega e forma de pagamento.* 😉

*Da Lúcia Restaurante* agradece seu pedido, bom apetite!!
  `.trim();

    // Exibir no console e copiar automaticamente
    console.log(cardapioTexto);
    navigator.clipboard.writeText(cardapioTexto)
      .then(() => alert("Cardápio gerado e copiado para área de transferência!"))
      .catch((err) => alert("Cardápio gerado, mas falha ao copiar: " + err));
  };

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
          {/* TODO: Criar Pesquisa pelos produtos  */}
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
