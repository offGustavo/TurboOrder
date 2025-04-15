import React from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import "../styles/ClientInfo.css";

const ClientInfo = ({ formData, handleChange }) => {
  const handlePhoneChange = (e) => {
    const phone = e.target.value ? e.target.value.replace(/\D/g, "") : "";
    handleChange({
      target: {
        name: "con_telefone",
        value: phone
      }
    });
  };

  return (
    <div>
      <div className="CliForm">
        <TextField
          id="clientInfo-name"
          label="Nome"
          variant="outlined"
          name="cli_nome"
          value={formData.cli_nome}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "30ch",
          }}
        />
        <TextField
          id="clientInfo-surname"
          label="Sobrenome"
          variant="outlined"
          name="cli_sobrenome"
          value={formData.cli_sobrenome}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "30ch",
          }}
        />
        </div>

        <div className="CliForm tel">
        <InputMask
          mask="(99) 99999-9999"
          value={formData.con_telefone}
          onChange={handlePhoneChange}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              id="clientInfo-phone"
              label="Telefone"
              variant="outlined"
              name="con_telefone"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                width: "30ch",
              }}
            />
          )}
        </InputMask>
      </div>
    </div>
  );
};


export default ClientInfo;