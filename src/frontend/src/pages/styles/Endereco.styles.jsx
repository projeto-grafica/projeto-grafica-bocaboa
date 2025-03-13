import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    color: #333;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
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
`;

export const Content = styled.form`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    max-width: 1100px;
    gap: 2rem;
    
    @media (max-width: 992px) {
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }
`;

export const FormEndereco = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 780px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 0.5rem 1.5rem;

    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const ResumePayment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;

    @media (max-width: 992px) {
        width: 100%;
        min-height: auto;
    }
`;

export const CarrinhoResumo = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 0.75rem;
    box-sizing: border-box;

    h2 {
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.75rem;
        text-align: center;
    }

    .carrinho-resumo-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
    }
`;

export const ResumoItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.375rem;
    
    span {
        font-size: 0.75rem;
        color: #333;
    }
`;

export const Divisor = styled.div`
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    margin: 0.5rem 0;
`;

export const ResumoTotal = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-weight: 500;
    
    span {
        font-size: 0.875rem;
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
`;

export const ContentPayments = styled.div`
    background-color: white;
    width: 70%;
    min-height: 300px;
    height: auto;
    padding: 2rem 3rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

/* Componentes específicos para PaymentMethodSelection */
export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const PaymentTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const PaymentOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const PaymentOption = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${props => props.selected ? '#4CAF50' : '#e0e0e0'};
    background-color: ${props => props.selected ? '#f0faf0' : '#fff'};
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: ${props => props.selected ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
    
    &:hover {
        border-color: #4CAF50;
        background-color: #f8f8f8;
    }
`;

export const RadioButton = styled.div`
    position: relative;
    margin-right: 1rem;
`;

export const RadioInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

export const RadioCircle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${props => props.selected ? '#4CAF50' : '#b0b0b0'};
    background-color: ${props => props.selected ? '#fff' : '#fff'};
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:after {
        content: '';
        display: ${props => props.selected ? 'block' : 'none'};
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #4CAF50;
    }
`;

export const PaymentIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    font-size: 1.25rem;
    color: #555;
`;

export const PaymentName = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: #333;
`;

export const CreditCardForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-top: 0.5rem;
    border: 1px solid #e0e0e0;
`;

export const FormRow = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    
    @media (max-width: 576px) {
        flex-direction: column;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.full ? '100%' : '48%'};
    
    @media (max-width: 576px) {
        width: 100%;
    }
`;

export const FormLabel = styled.label`
    font-size: 0.875rem;
    color: #555;
    margin-bottom: 0.25rem;
`;

export const FormInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #333;
    
    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
    
    &::placeholder {
        color: #aaa;
    }
`;

export const ExpiryDateContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ExpiryInput = styled.input`
    width: 50%;
    height: 40px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #333;
    
    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
    
    &::placeholder {
        color: #aaa;
    }
`;