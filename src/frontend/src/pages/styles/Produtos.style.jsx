import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 5vh 7.5vw;
  background-color: #f9f9f9;
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
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    color: #666;
    font-size: 14px;
  }

  select {
    padding: 2px 5px;
    border: 1px solid #ddd;
    border-radius: 14px;
    background-color: white;
    color: #2E2E30;
    font-size: 14px;
    width: 200px;
  }
`;

export const ResultCount = styled.span`
  color: #666;
  font-size: 14px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4.32vw;
  margin-top: 1rem;
  justify-content: space-between;
`;
