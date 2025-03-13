import React from 'react';
import { FaCheck, FaTruck, FaCreditCard, FaRegCheckCircle } from 'react-icons/fa';
import { StepsContainer, Step, StepCircle, StepLabel, StepConnector } from './styles/RoadMapStepsStyles';
import { useLocation, useNavigate } from 'react-router-dom';

const RoadMapSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mapeamento de estágios para rotas
  const routeMap = {
    0: "/carrinho",
    1: "/compras/endereco",
    2: "/compras/pagamento",
    3: "/compras/confirmacao"
  };

  const currentStage = Object.values(routeMap).indexOf(location.pathname);

  // Função para verificar se a etapa pode ser acessada
  const canAccessStep = (stage) => {
    const completedStages = localStorage.getItem('completedStages') ? JSON.parse(localStorage.getItem('completedStages')) : [];
    return stage <= currentStage || completedStages.includes(stage);
  };

  // Função para definir as cores
  const getStepStyles = (stage) => {
    if (stage < currentStage) {
      return { backgroundColor: '#62A860', borderColor: '#62A860', color: 'white' }; // Etapa concluída (verde)
    }
    if (stage === currentStage) {
      return { backgroundColor: '#F7F7F7', borderColor: '#62A860', color: '#62A860' }; // Etapa atual (cinza)
    }
    return { backgroundColor: '#C8C8C8', borderColor: '#C8C8C8', color: 'white' }; // Etapa futura (toda cinza)
  };

  // Função para definir o ícone correto
  const getStepIcon = (stage) => {
    if (stage < currentStage) return <FaCheck />; // Exibe check quando concluído
    if (stage === 1) return <FaTruck />;
    if (stage === 2) return <FaCreditCard />;
    return <FaRegCheckCircle />;
  };

  const handleStepClick = (stage) => {
    if (canAccessStep(stage) && stage <= currentStage) {
      navigate(routeMap[stage]);
    }
  };

  return (
    <StepsContainer>
      <Step 
        completed={(currentStage > -1).toString()}
        active={(currentStage === 0).toString()}
        onClick={() => handleStepClick(0)}
        style={{ cursor: canAccessStep(0) ? 'pointer' : 'default' }}
      >
        <StepCircle 
          completed={(currentStage > -1).toString()} 
          active={(currentStage === 0).toString()}
          style={getStepStyles(0)}
        >
          <FaCheck /> {/* Carrinho sempre com check */}
        </StepCircle>
        <StepLabel>Carrinho</StepLabel>
      </Step>
      
      <StepConnector />
      
      {[1, 2, 3].map(stage => (
        <React.Fragment key={stage}>
          <Step 
            completed={(currentStage > stage - 1).toString()}
            active={(currentStage === stage).toString()}
            onClick={() => handleStepClick(stage)}
            style={{ cursor: canAccessStep(stage) ? 'pointer' : 'default' }}
          >
            <StepCircle 
              completed={(currentStage > stage - 1).toString()} 
              active={(currentStage === stage).toString()}
              style={getStepStyles(stage)}
            >
              {getStepIcon(stage)}
            </StepCircle>
            <StepLabel>
              {stage === 1 ? "Envio" : stage === 2 ? "Pagamento" : "Confirmação"}
            </StepLabel>
          </Step>
          
          {stage !== 3 && <StepConnector />}
        </React.Fragment>
      ))}
    </StepsContainer>
  );
};

export { RoadMapSteps };
