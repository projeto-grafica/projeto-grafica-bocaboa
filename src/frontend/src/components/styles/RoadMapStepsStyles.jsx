import styled from "styled-components";

export const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
`;

export const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.completed ? '#5cb85c' : 
    props.active ? '#ffffff' : 'white'};
  color: ${props => 
    props.completed ? '#ffffff' : 
    props.active ? '#5cb85c' : '#9e9e9e'};
  border: 2px solid ${props => 
    props.completed ? '#5cb85c' : 
    props.active ? '#5cb85c' : '#9e9e9e'};
  margin-bottom: 4px;
  z-index: 3;
`;

export const StepLabel = styled.div`
  font-size: 12px;
  font-weight: ${props => props.active || props.completed ? '500' : 'normal'};
  color: #333;
  text-align: center;
  position: absolute;
  top: 0%;
  transform: translateY(-150%);
  white-space: nowrap;
`;

export const StepConnector = styled.div`
  height: 2px;
  background-color: #9e9e9e;
  flex-grow: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  z-index: 1;
`;
