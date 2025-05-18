// components/EditProductModal.js
import React from "react";
import { Modal, Box, TextField, MenuItem, Button } from "@mui/material";
import "../styles/EditProductModal.css"; 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  
  borderRadius: '10px',
};



const EditProductModal = ({
  open,
  onClose,
  product,
  proNome,
  proTipo,
  onSave,
  setProNome,
  setProTipo,
  productTypes,
}) => {
  if (!product) return null;
 
  return (
    <Modal open={open} onClose={onClose} >
      <Box sx={style} className="modal-container">
        <h2>Editar Produto</h2>


        <Box display="flex" gap={2} mb={18}>
        <TextField
          fullWidth
          margin="normal"
          label="Nome do Produto"
          value={proNome}
          onChange={(e) => setProNome(e.target.value)}
           sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
        />
        <TextField
          fullWidth
          margin="normal"
          select
          label="Tipo do Produto"
          value={proTipo}
          onChange={(e) => setProTipo(e.target.value)}
           sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
        >
          {productTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              marginRight: 1,
              backgroundColor: '#dc3545',
              color: '#fff',
              '&:hover': { backgroundColor: '#bc0b0b' }
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            sx={{
              marginRight: 1,
              backgroundColor: '#FFBD0D',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#e4aa0a' }
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
