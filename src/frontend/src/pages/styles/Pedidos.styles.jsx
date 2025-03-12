import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 2rem 7.5vw;
  background-color: #f9f9f9;

  .list-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
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
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 1rem;
`;
