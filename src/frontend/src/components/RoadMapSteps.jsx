import React from 'react';
import { FaCheck, FaTruck, FaCreditCard, FaRegCheckCircle } from 'react-icons/fa';
import { StepsContainer, Step, StepCircle, StepLabel, StepConnector } from './styles/RoadMapStepsStyles';

// RoadMap component to replace the previous empty div
const RoadMapSteps = () => {
  return (
    <StepsContainer>
      <Step completed>
        <StepCircle completed>
          <FaCheck />
        </StepCircle>
        <StepLabel>Carrinho</StepLabel>
      </Step>
      
      <StepConnector />
      
      <Step active>
        <StepCircle active>
          <FaTruck />
        </StepCircle>
        <StepLabel>Envio</StepLabel>
      </Step>
      
      <StepConnector />
      
      <Step>
        <StepCircle>
          <FaCreditCard />
        </StepCircle>
        <StepLabel>Pagamento</StepLabel>
      </Step>
      
      <StepConnector />
      
      <Step>
        <StepCircle>
          <FaRegCheckCircle />
        </StepCircle>
        <StepLabel>Confirmação</StepLabel>
      </Step>
    </StepsContainer>
  );
};

export { RoadMapSteps };