import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ options, tipoSelecionado, onChange }) {
  const filteredOptions = options.filter((option) => option.pro_tipo === tipoSelecionado);

  return (
    <Autocomplete
      disablePortal
      options={filteredOptions}
      getOptionLabel={(option) => option.pro_nome}
      onChange={(event, value) => {
        if (onChange) {
          onChange(value);
        }
      }}
      sx={{
        marginRight: 2,
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": { borderColor: "#FD1F4A" },
          "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
        },
        width: "30ch",
      }}
      renderInput={(params) => <TextField {...params} label={tipoSelecionado} />}
    />
  );
}