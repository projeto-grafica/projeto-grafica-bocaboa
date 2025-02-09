import React from 'react';
import styled from 'styled-components';
import { IoIosHeartEmpty } from "react-icons/io";
import ProdutCard from '../components/ProductCard';

const PageContainer = styled.div`
  padding: 2rem 4rem;
  background-color: #f9f9f9;
`;

const HeaderSection = styled.div`
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 1rem;
`;

const Favoritos = () => {
    return (
        <PageContainer>
            <HeaderSection>
                <IoIosHeartEmpty size={24} />
                <h1>Meus favoritos</h1>
            </HeaderSection>

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

export default Favoritos;