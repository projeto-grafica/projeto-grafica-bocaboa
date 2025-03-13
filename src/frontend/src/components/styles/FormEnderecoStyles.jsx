import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    box-sizing: border-box;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    h2 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #333;
        margin: 0;
    }
    
    @media (max-width: 480px) {
        justify-content: center;
        text-align: center;
        
        h2 {
            width: 100%;
        }
    }
`;

export const StyledButton = styled.div`
    background-color: #4e8c4c;
    color: white;
    border: none;
    height: 35px;
    padding: 0 1.25rem;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;

    &:hover {
        background-color: #5ea95c;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
`;

export const Row = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1.5rem;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.flex || 1};
    width: 100%;
    min-width: 0; /* Previne overflow em elementos flexíveis */
`;

export const Input = styled.input`
    width: 100%;
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0 0.9375rem;
    font-size: 0.875rem;
    box-sizing: border-box;
    transition: all 0.2s;
    
    &:focus {
        border-color: #4e8c4c;
        box-shadow: 0 0 0 2px rgba(78, 140, 76, 0.2);
        outline: none;
    }
    
    &::placeholder {
        color: #aaa;
    }
    
    @media (max-width: 480px) {
        height: 45px; /* Input maior em telas pequenas para facilitar o toque */
    }
`;

export const Label = styled.label`
    font-size: 0.9375rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #444;
`;

export const SaveAddressRow = styled.div`
    display: flex;
    width: 100%;
    padding-top: 1rem;
    align-items: center;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Checkbox = styled.input`
    cursor: pointer;
    width: 14px;
    height: 14px;
    accent-color: #4e8c4c;
    
    @media (max-width: 480px) {
        width: 18px;
        height: 18px;
    }
`;

export const CheckboxLabel = styled.label`
    font-size: 0.75rem;
    cursor: pointer;
    color: #444;
    user-select: none;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 1.5rem;
    
    @media (max-width: 480px) {
        justify-content: center;
    }
    
    button {
        min-width: 150px;
    }
`;