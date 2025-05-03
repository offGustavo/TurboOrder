import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ options, tipoSelecionado, onChange }) {
  const filteredOptions = options.filter(
    (option) => option.pro_tipo === tipoSelecionado && option.pro_ativo === 1
  );

  return (
    <Autocomplete
      disablePortal
      options={filteredOptions}
      getOptionLabel={(option) => option.pro_nome || ""}
      sx={{ width: 300 }}
      onChange={(event, value) => onChange && onChange(value)} // envia o produto selecionado ao pai, se necessário
      renderInput={(params) => <TextField {...params} label={tipoSelecionado} />}
    />
  );
}
