import styled from 'styled-components';

export const PageContainerMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
` 

export const PageContainer = styled.div`
  padding: 2rem 5%;
  max-width: 1080px;
  width: 100%;
`;

export const ResultHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.2rem;
    color: #2E2E30;
    margin-bottom: 1rem;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    color: #666;
    font-size: 0.875rem;
  }

  select {
    padding: 2px 5px;
    border: 1px solid #ddd;
    border-radius: 14px;
    background-color: white;
    color: #2E2E30;
    font-size: 0.875rem;
    width: 200px;
    
    @media (max-width: 480px) {
      width: 100%;
      max-width: 180px;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ResultCount = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: space-between;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;