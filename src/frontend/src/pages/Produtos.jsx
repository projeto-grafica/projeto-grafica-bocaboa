import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProdutCard from '../components/ProductCard';

const PageContainer = styled.div`
  padding: 5vh 7.5vw;
  background-color: #f9f9f9;
`;

const ResultHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.2rem;
    color: #2E2E30;
    margin-bottom: 1rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterGroup = styled.div`
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

const ResultCount = styled.span`
  color: #666;
  font-size: 14px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4.32vw;
  margin-top: 1rem;
  justify-content: space-between;
`;

const Produtos = () => {
    const { nome } = useParams();

    return (
        <PageContainer>
            <ResultHeader>
                <h1>Resultados para "{nome}"</h1>
                <FilterSection>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <FilterGroup>
                            <label>Ordenar:</label>
                            <select defaultValue="mais-avaliados">
                                <option value="mais-avaliados">Mais avaliados</option>
                                <option value="menor-preco">Menor preço</option>
                                <option value="maior-preco">Maior preço</option>
                            </select>
                        </FilterGroup>
                        <FilterGroup>
                            <label>Exibir:</label>
                            <select defaultValue="20">
                                <option value="20">20 por página</option>
                                <option value="40">40 por página</option>
                                <option value="60">60 por página</option>
                            </select>
                        </FilterGroup>
                    </div>
                    <ResultCount>120 Produtos</ResultCount>
                </FilterSection>
            </ResultHeader>

            <ProductGrid>
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
                <ProdutCard />
            </ProductGrid>
        </PageContainer>
    );
};

export default Produtos;