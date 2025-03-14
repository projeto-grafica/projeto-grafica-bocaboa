import React from 'react';
import styled from 'styled-components';
import { IoIosHeartEmpty } from "react-icons/io";
import ProdutCard from '../components/ProductCard';

const PageContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 30px 0;
`

const PageContainer = styled.div`
  width: 1100px;
  background-color: #f9f9f9;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  
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
      <PageContainerMain>
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
       </PageContainerMain>
    );
};

export default Favoritos;