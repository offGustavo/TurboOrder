import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const PopupModal = ({ showModal, onClose, onConfirm, actionType }) => {
  const getMessage = () => {
    switch (actionType) {
      case "confirmarCadastro":
        return {
          title: "Confirmar Cadastro",
          message: "Você tem certeza de que deseja cadastrar este cliente? Verifique se todos os dados estão corretos antes de prosseguir.",
        };
      case "confirmarExclusao":
        return {
          title: "Excluir Cliente",
          message: "Tem certeza de que quer excluir este cliente? Esta ação não poderá ser desfeita.",
        };
      case "confirmarAtualizacao":
        return {
          title: "Atualizar Cliente",
          message: "Você está prestes a atualizar as informações deste cliente. Verifique se todas as mudanças estão corretas.",
        };
      case "confirmarRevisao":
        return {
          title: "Revisar Formulário",
          message: "Por favor, antes de finalizar o pedido, revise o formulário para verificar se não há nenhum erro de digitação ou falta de preenchimento de algum campo.",
      };
      default:
        return {
          title: "Confirmação",
          message: "Você tem certeza de que deseja continuar com esta ação?",
        };
    }
  };

  const { title, message } = getMessage();

  const messageText = message && typeof message === "string" ? message : "";

  return (
    <Modal open={showModal} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#000', fontSize: '20px', fontFamily: 'Poppins' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', marginBottom: '20px', fontSize: '16px', fontFamily: 'Poppins' }}>{messageText}</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button variant="outlined" sx={{ padding: '8px 16px', fontWeight: 'bold', textTransform: 'capitalize', backgroundColor: '#FD1F4A', color: '#fff', border: 'none' }} onClick={onClose} >
            Cancelar
          </Button>
          <Button variant="contained" sx={{ padding: '8px 16px', fontWeight: 'bold', textTransform: 'capitalize', backgroundColor: '#FFBD0D', color: '#000' }} onClick={onConfirm}>
            Confirmar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PopupModal;