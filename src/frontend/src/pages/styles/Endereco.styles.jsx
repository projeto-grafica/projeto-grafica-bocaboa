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
    width: 30%;
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
    width: 100%;
    padding: 0.75rem;
    box-sizing: border-box;

    h2 {
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.75rem;
        color: #333;
        text-align: center;
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