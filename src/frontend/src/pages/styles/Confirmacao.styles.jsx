import styled from "styled-components";

export const ContainerMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Container = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;

    .finalizar-compra-botao {
        width: 100%;
        display: flex;
        justify-content: end;
    }
`

export const RoadMap = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 1rem 0;

    @media (max-width: 768px) {
        width: 95%;
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
`

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  margin-bottom: 1.5rem;
  position: relative;
`;

export const GridCard = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
`

export const Card = styled.div`
    padding: 1rem;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`

export const BotaoFinalizar = styled.button`
    width: 20%;
    height: 35px;
    background-color: ${props => props.disabled ? '#cccccc' : '#4CAF50'};
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 20px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-weight: 500;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.disabled ? '#cccccc' : '#45a049'};
    }
`;