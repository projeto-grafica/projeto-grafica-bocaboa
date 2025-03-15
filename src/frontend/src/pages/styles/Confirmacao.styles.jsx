import styled from "styled-components";

export const ContainerMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f8f8; /* Fundo levemente cinza */

    @media (max-aspect-ratio: 4/3) {
        width: 100%;
        padding: 1rem 0;
    }
`;

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
        margin-top: 1rem;
    }

    @media (max-aspect-ratio: 4/3) {
        width: 95%;
        padding: 0;
    }
`;

export const RoadMap = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 1rem 0;

    @media (max-width: 768px) {
        width: 95%;
    }

    @media (max-aspect-ratio: 4/3) {
        max-width: 100%;
        overflow-x: auto;
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;

    @media (max-aspect-ratio: 4/3) {
        padding: 0;
    }
`;

export const Title = styled.h2`
    font-size: 1.125rem;
    font-weight: 600;
    color: #333;
    margin: 0;
    margin-bottom: 1.5rem;

    @media (max-aspect-ratio: 4/3) {
        font-size: 1rem;
    }
`;

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

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-aspect-ratio: 4/3) {
        width: 100%;
        height: 45px;
    }
`;

export const GridCard = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;

    @media (max-aspect-ratio: 4/3) {
        flex-direction: column;
        gap: 1rem;
    }
`;

export const Card = styled.div`
    padding: 1rem;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    max-height: 350px;

    .content-carrinho {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;

        p {
            margin: 0;
            font-weight: 400;
            color: #333;
        }

        img {
            border-radius: 10px;
        }

        .product {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0 0 1rem 0;
            border-bottom: 1px solid #f0f0f0;
        }
    }

    .endereco{
        p {
            margin: 0;
            font-weight: 400;
            font-size: 0.9rem;
            line-height: 1.8;
            color: #333;
        }

        b{
            font-weight: 500;
            font-size: 1rem;
            line-height: 2.5;
        }
    }

    .frete {
        border-top: 1px solid #f0f0f0;
        padding-top: 1rem;
        margin-top: 1rem;
        p {
            margin: 0;
            font-weight: 400;
            font-size: 0.8rem;
            line-height: 1.8;
            color: #333333b9;
        }

    }

    .metodopag{
        padding: 1rem 2rem;
        border: 1px solid #3333337b;
        border-radius: 10px;
        font-weight: 500;
        margin: 0;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        color: #333333f8;
    }

    .valor{
        width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        .total{
            width: 100%;
            padding-bottom: 1rem;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            flex-direction: column;
            font-size: 0.9rem;
            font-weight: 400;
            color: #333;

            p{
                margin: 0.5rem;
                display: flex;
                justify-content: space-between;
            }
        }

        .valorfinal{
            font-size: 0.8rem;
            font-weight: 400;
            color: #333;
            width: 100%;
            display: flex;
            justify-content: start;
            padding: 1rem 2rem;
        }
    }

    @media (max-aspect-ratio: 4/3) {
        width: 90%;
        padding: 5%;
        max-height: none;
        margin-bottom: 0.5rem;
        
        .content-carrinho {
            max-height: 200px;
        }
        
        .product {
            padding: 0 0 0.75rem 0;
        }
        
        .metodopag {
            padding: 0.75rem 1rem;
            font-size: 0.8rem;
        }
        
        .valor .valorfinal {
            padding: 0.75rem 1rem;
        }
    }
`;

/* Novo estilo para o cabeçalho dos cards */
export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;

    .head {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 0.5rem;
    }

    @media (max-aspect-ratio: 4/3) {
        padding: 0.3rem 0;
        margin-bottom: 0.75rem;
    }
`;

export const CardLeft = styled.div`
    display: flex;
    align-items: center;

    svg {
        color: #4CAF50;
    }
`;

export const Editar = styled.span`
    font-size: 0.875rem;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        color: #333;
    }
`;

export const CardTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 500;
    color: #333;
    margin: 0;

    @media (max-aspect-ratio: 4/3) {
        font-size: 1rem;
    }
`;