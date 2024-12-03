import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SelectTime from './SelectTime.js';

export default function DeliverySelect() {
  const [selectedOption, setSelectedOption] = React.useState("delivery"); // Estado para rastrear a seleção
  const [selectedTime, setSelectedTime] = React.useState(null);

  return (
    <FormControl>
      <FormLabel id="delivery-options-label">Escolha o método de entrega</FormLabel>
      <RadioGroup
        aria-labelledby="delivery-options-label"
        value={selectedOption} // Vincula o estado ao RadioGroup
        onChange={(event) => setSelectedOption(event.target.value)} // Atualiza o estado
        name="delivery-options-group"
      >
        <FormControlLabel value="delivery" control={<Radio />} label="Entrega" />
        <FormControlLabel value="local" control={<Radio />} label="Retirar no local" />
      </RadioGroup>

      <div>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          {/* Exibe a seção de Entrega se a opção for "delivery" */}
          {selectedOption === "delivery" && (
            <div className="EntregaSection">
              <TextField id="cep" label="CEP" variant="outlined" />
              <TextField id="cidade" label="Cidade" variant="outlined" />
              <TextField id="bairro" label="Bairro" variant="outlined" />
              <TextField id="rua" label="Rua" variant="outlined" />
              <TextField id="numero" label="Número" variant="outlined" />
              <TextField id="complemento" label="Complemento" variant="outlined" />
            </div>
          )}

          {/* Exibe a seção de Retirada Local se a opção for "local" */}
          {selectedOption === "local" && (
            <div className="LocalSection" style={{ padding: 20 }}>
              <h4>Selecione um Horário</h4>
              <SelectTime
                label="Horário"
                value={selectedTime}
                onChange={(newTime) => setSelectedTime(newTime)}
              />
              {selectedTime && <p>Horário Selecionado: {selectedTime.format("HH:mm")}</p>}
            </div>
          )}
        </Box>
      </div>
    </FormControl>
  );
}
