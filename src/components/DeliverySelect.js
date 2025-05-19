import React, { useState } from "react";
import styled from "styled-components";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SelectTime from './SelectTime.js';
import Address from '../components/Address.js'
import ClientInfo from './ClientInfo.js';
import "../styles/DeliverySelect.css";

export default function DeliverySelect({ formData, setFormData, selectedTime, setSelectedTime }) {
  const [selectedOption, setSelectedOption] = React.useState("delivery");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "delivery") {
      setSelectedTime(null); // Zera o horário se for entrega
    }
  };

  // WARN: NÃO REMOVER ISSO, CAUSA BUG 
  const SubText = styled.h2` margin: 20px 0px 20px 0px; font-size: 16px; `;
  const Form = styled.div` display: flex; `;
  const Container = styled.div` display: flex; padding: 0px 10px;`;

  return (
    <FormControl>
      <FormLabel id="delivery-options-label">Escolha o método de entrega</FormLabel>
      <RadioGroup
        aria-labelledby="delivery-options-label"
        value={selectedOption}
        onChange={handleOptionChange}
        name="delivery-options-group"
      >
        <FormControlLabel value="delivery" control={<Radio />} label="Entrega" />
        <FormControlLabel value="local" control={<Radio />} label="Retirar no local" />
      </RadioGroup>

      <Form>
        <Box component="form" noValidate autoComplete="off">
          {selectedOption === "delivery" && (
            <div className="EntregaSection">
              <SubText>Endereço do Cliente</SubText>
              <Container>
                <Address formData={formData} handleChange={handleChange} />
              </Container>
            </div>
          )}

          {selectedOption === "local" && (
            <div className="LocalSection" style={{ padding: 0 }}>
              <SubText>Selecione um Horário</SubText>
              <Container>
                <SelectTime
                  label="Horário"
                  value={selectedTime}
                  onChange={(newTime) => setSelectedTime(newTime)}
                />
              </Container>
            </div>
          )}
        </Box>
      </Form>
    </FormControl>
  );
}
