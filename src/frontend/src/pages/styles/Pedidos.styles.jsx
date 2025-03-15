import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f9f9f9;
  padding: 20px 0;

  .list-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const Container = styled.div`
  width: 1100px;
  
  @media (max-aspect-ratio: 4/3) {
    width: 90%;
    max-width: 1100px;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.5rem;
    color: #2E2E30;
    margin: 0;
    font-weight: 500;
  }
  
  @media (max-aspect-ratio: 4/3) {
    h1 {
      font-size: 1.2rem;
    }
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 1rem;
  
  @media (max-aspect-ratio: 4/3) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
