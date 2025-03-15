import styled from "styled-components";

export const ContainerMain = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 40px 0;
    padding: 0 15px;
    
    @media (max-aspect-ratio: 4/3) {
        margin: 0;
        padding: 20px 0;
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1100px;
    width: 100%;
    gap: 20px;
    
    .carrinho-resumo {
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 260px;
        border-radius: 10px;
        padding: 25px;
        height: fit-content;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        
        h2 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
            margin-top: 15px;
            color: #333;
        }
        
        h2:first-child {
            margin-top: 0;
        }
    }
    
    @media (max-aspect-ratio: 4/3) {
        max-width: 500px;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        
        .carrinho-resumo {
            width: 100%;
            max-width: 300px;
            margin-top: 20px;
            padding: 30px 25px ;
        }
    }
`;

export const CarrinhoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 680px;
    background-color: white;
    border-radius: 10px;
    min-height: 400px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    padding: 0 20px;
    
    h1 {
        margin-top: 4dvh;
        width: 95%;
        font-size: 18px;
        font-weight: 500;
    }
    
    .indice-carrinho {
        width: 95%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e0e0e0;
        
        h2 {
            margin: 0;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            padding: 5px 0;
            color: #888888;
        }
        
        h2:nth-child(1) {
            width: 60%;
            justify-content: flex-start;
        }
        
        h2:nth-child(2) {
            width: 20%;
            justify-content: center;
        }
        
        h2:nth-child(3) {
            width: 20%;
            justify-content: end;
        }
    }
    
    .divisor {
        width: 95%;
        border-bottom: 1px solid #e0e0e0;  
    }

    @media (max-aspect-ratio: 4/3) {
        width: 100%;
        max-width: 300px;
        margin-top: 20px;
        padding: 30px 25px;

        .indice-carrinho {
            h2 {
                font-size: 12px;
            }
        }
    }
`;

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    
    input {
        flex: 1;
        border: none;
        border-radius: 10px 0 0 10px;
        padding: 0 10px;
        background-color: #F7F7F7;
        outline: none;
    }
    
    button {
        width: 40px;
        background-color: #F7F7F7;
        border: none;
        border-radius: 0 10px 10px 0;
        border-left: 1px solid #e0e0e0;
        cursor: pointer;
        transition: background-color 0.3s;
        
        &:hover {
            background-color: #4CAF50;
            color: white;
        }
    }
    
    @media (max-aspect-ratio: 4/3) {
        height: 40px;
        
        input {
            font-size: 14px;
        }
    }
`;

export const MensagemFrete = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
    color: ${props => props.status ? '#4CAF50' : '#f44336'};
`;

export const ResumoItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    
    span {
        font-size: 14px;
        color: ${props => props.desconto ? '#4CAF50' : '#333'};
    }
`;

export const Divisor = styled.div`
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    margin: 10px 0;
`;

export const ResumoTotal = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-weight: 500;
   
    span {
        font-size: 16px;
    }
    
    @media (max-aspect-ratio: 4/3) {
        margin: 15px 0;
        
        span {
            font-size: 18px;
        }
    }
`;

export const BotaoProximo = styled.button`
    width: 100%;
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
    
    @media (max-aspect-ratio: 4/3) {
        height: 45px;
        font-size: 16px;
        margin-top: 25px;
    }
`;