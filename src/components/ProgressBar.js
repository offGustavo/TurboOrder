import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  text-align: center;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;

const StepCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ active, completed }) =>
    completed ? "#FD1F4A" : active ? "#FD1F4A" : "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const StepText = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ active, completed }) =>
    completed || active ? "#FD1F4A" : "#ccc"};
`;

const Line = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${({ active }) => (active ? "#FD1F4A" : "#ccc")};
`;

const FilledCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
`;

const ProgressBar = () => {
  const location = useLocation();

  const steps = [
    { path: "/adicionar-pedido", label: "Adicionar Pedido" },
    { path: "/cadastro-de-cliente", label: "Cadastrar Cliente" },
    { path: "/cadastro-de-cliente/pedidos", label: "Cadastrar Pedidos" },
    { path: "/finalizar", label: "Finalizar" },
  ];

  const [subStepIndex, setSubStepIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === "/cadastro-de-cliente") {
      setSubStepIndex(1);
    }
  }, [location.pathname]);

  const currentStepIndex = (() => {
    const orderedSteps = [...steps].sort((a, b) => b.path.length - a.path.length);
    const matchedStep = orderedSteps.find((step) =>
      location.pathname.startsWith(step.path)
    );
    return steps.findIndex((step) => step.path === matchedStep?.path);
  })();

  return (
    <StepContainer>
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <Step>
            <StepCircle
              active={index === currentStepIndex}
              completed={index < currentStepIndex}
            >
              {index < currentStepIndex && <FilledCircle />}
            </StepCircle>
            <StepText
              active={index === currentStepIndex}
              completed={index <= currentStepIndex}
            >
              {step.label}
            </StepText>
          </Step>
          {index < steps.length - 1 && (
            <Line active={index < currentStepIndex} />
          )}
        </React.Fragment>
      ))}
    </StepContainer>
  );
};


export default ProgressBar;