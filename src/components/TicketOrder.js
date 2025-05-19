import React, { useRef, useImperativeHandle } from 'react';
import { useReactToPrint } from 'react-to-print';

const TicketOrder = React.forwardRef(({ pedido }, ref) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Pedido',
    removeAfterPrint: true,
  });

  useImperativeHandle(ref, () => ({
    print: () => {
      if (pedido) handlePrint();
    }
  }));

  return (
    <div style={{ display: 'none' }}>
      <div ref={printRef} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Comprovante de Pedido</h2>
        <p><strong>Pedido ID:</strong> {pedido.id}</p>
        <p><strong>Cliente:</strong> {pedido.cliente.nome} {pedido.cliente.sobrenome}</p>
        <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
        {pedido.horarioRetirada && (
          <p><strong>Horário de Retirada:</strong> {pedido.horarioRetirada}</p>
        )}
        <p><strong>Status:</strong> {pedido.status}</p>
        <p><strong>Pagamento:</strong> {pedido.tipoPagamento}</p>
        <p><strong>Observação:</strong> {pedido.observacao || 'Nenhuma'}</p>
        <hr />
        <h3>Itens:</h3>
        <ul>
          {pedido.itens.arroz_fk && <li>Arroz: {pedido.itens.arroz_fk}</li>}
          {pedido.itens.feijao_fk && <li>Feijão: {pedido.itens.feijao_fk}</li>}
          {pedido.itens.massa_fk && <li>Massa: {pedido.itens.massa_fk}</li>}
          {pedido.itens.salada_fk && <li>Salada: {pedido.itens.salada_fk}</li>}
          {pedido.itens.acompanhamento_fk && <li>Acompanhamento: {pedido.itens.acompanhamento_fk}</li>}
          {pedido.itens.carne01_fk && <li>Carne 1: {pedido.itens.carne01_fk}</li>}
          {pedido.itens.carne02_fk && <li>Carne 2: {pedido.itens.carne02_fk}</li>}
        </ul>
        <hr />
        <p><strong>Total:</strong> R$ {pedido.valor.toFixed(2)}</p>
      </div>
    </div>
  );
});

export default TicketOrder;
