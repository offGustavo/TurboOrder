import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function SelectTime({ label, onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        ampm={false} // Configura o formato 24 horas
        value={value}
        onChange={(newValue) => onChange(newValue)}
        renderInput={(params) => <TextField {...params} label={label || "Selecione o horário"} />}
      />
    </LocalizationProvider>
  );
}
