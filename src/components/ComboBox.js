import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Exemplo de objeto 
// const options = [
//   {
//     id: 1,
//     nome: "Arroz Soltinho",
//     tipo: "Arroz"
//   },
// ];

export default function ComboBox({ options, tipoSelecionado }) {
  const filteredOptions = options.filter((option) => option.tipo === tipoSelecionado); // Filtra pelo tipo

  return (
    <Autocomplete
      disablePortal
      options={filteredOptions}
      getOptionLabel={(option) => option.nome} // Define o campo usado para exibir os itens
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={tipoSelecionado} />} // Passa os parâmetros corretamente
    />
  );
}
