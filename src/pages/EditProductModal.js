import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import '../style/Global.css';

export default function EditProductModal({
  open,
  onClose,
  onSave,
  proNome,
  proTipo,
  setProNome,
  setProTipo,
  productTypes
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <TextField
            fullWidth
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
            select
            label="Tipo do Produto"
            value={proTipo}
            onChange={(e) => setProTipo(e.target.value)}
            helperText="Por favor selecione um tipo"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='btn-cancel'>
          Fechar
        </Button>
        <Button onClick={onSave} className="btn-salvar">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
