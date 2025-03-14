import styled from 'styled-components';

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

export const PaymentTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  margin-bottom: 1.5rem;
  position: relative;
`;

export const PaymentOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid ${props => props.selected ? '#ff7a00' : '#eaeaea'};
  background-color: white;
  box-shadow: ${props => props.selected ? '0 4px 8px rgba(255, 122, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.02)'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.selected ? '#ff7a00' : '#d0d0d0'};
    transform: translateY(-2px);
  }
`;

export const RadioButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const RadioCircle = styled.span`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 1px solid ${props => props.selected ? '#ff7a00' : '#d0d0d0'};
  display: flex;
    align-items: center;
    justify-content: center;
  transition: all 0.2s ease;

  &:after {
    content: '';
    display: ${props => props.selected ? 'block' : 'none'};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff7a00;
    transition: all 0.2s ease;
  }
`;

export const PaymentIcon = styled.div`
  margin-right: 1rem;
  font-size: 1rem;
  color: #555;
  width: 30px;
  text-align: center;
  transition: color 0.2s ease;
`;

export const PaymentName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

export const CreditCardForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
  border: 1px solid #ff7a00;
  border-radius: 10px;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  gap: 1.25rem;
  box-shadow: inset 0 2px 4px rgba(255, 122, 0, 0.1);

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ff7a00;
    border-radius: 8px;
    background-color: #ff7a00;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #ff7a00;
      filter: brightness(0.9);
    }
  }

  div {
    width: 80%;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: center; 
    padding: 0.5rem;
    font-size: 0.8rem;
    color: #333;

    b{
      font-weight: 600;
      color: #ff7a00;
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  width: 90%;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.full ? '3' : '1'};
`;

export const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
`;

export const FormInput = styled.input`
  padding: 0.5rem 0.8rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.8rem;
  background-color: #fff;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #ff7a00;
    box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
  }
  
  &::placeholder {
    color: #bbb;
  }
`;

export const ExpiryDateContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const ExpiryInput = styled.input`
    width: 30%;
  padding: 0.5rem 0.8rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.8rem;
  flex: 1;
  background-color: #fff;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #ff7a00;
    box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
  }
  
  &::placeholder {
    color: #bbb;
  }
`;