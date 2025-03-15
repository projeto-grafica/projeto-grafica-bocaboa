import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardPedidoContainer = styled.div`
  width: 700px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .card-content {
        display: flex;
        gap: 1.5rem;
        align-items: end;
    
        img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 10px;
        }
    }
  }

  @media (max-aspect-ratio: 4/3) {
    width: 90%;
    padding: 1rem;
    
    .card-body {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
      
      .card-content {
        width: 100%;
        
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    .card-body {
      .card-content {
        flex-direction: column;
        align-items: flex-start;
        
        img {
          margin-bottom: 0.8rem;
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #C8C8C8;
  
  @media (max-aspect-ratio: 4/3) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

export const OrderInfo = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const Status = styled.span`
  width: 100px;
  height: 20px;
  border-radius: 10px;
  background-color: #00a65038;
  color: #00a650;
  font-weight: 500;
  font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DetailsContainer = styled.div`
  @media (max-aspect-ratio: 4/3) {
    width: 100%;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: start;
  gap: 8px;
  margin-bottom: 5px;
  font-size: 12px;
`;

export const DetailLabel = styled.span`
  color: #666;
  margin: 0;
`;

export const DetailTitle = styled.span`
    color: #2e2e30;
    font-weight: 500;
    font-size: 16px;
`

export const DetailValue = styled.span`
  color: #666;
  font-weight: 500;
    margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  
  @media (max-aspect-ratio: 4/3) {
    flex-direction: row;
    gap: 15px;
    width: 100%;
    justify-content: space-between;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const ActionLink = styled(Link)`
  text-decoration: none;
  color: #2e2e309d;
  font-weight: 500;
  font-size: 14px;
  transition: opacity 0.2s;
  border: 1px solid #2e2e30ab;
  width: 180px;
  height: 30px;
  display: flex;  
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  &:hover {
    opacity: 0.8;
  }
  
  @media (max-aspect-ratio: 4/3) {
    width: 48%;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;
