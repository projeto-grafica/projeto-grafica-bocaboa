import React from 'react';
import styled from 'styled-components';
import { IoCubeOutline } from "react-icons/io5";
import ProdutCard from '../components/ProductCard';
import CardPedido from '../components/CardPedido';

const PageContainer = styled.div`
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

const Pedidos = () => {
    return (
        <PageContainer>
            <HeaderSection>
                <IoCubeOutline size={24} />
                <h1>Meus pedidos</h1>
            </HeaderSection>

            <div className='list-cards'>
                <CardPedido
                    order={{
                        date: "23 de novembro",
                        number: "1309845",
                        status: "Concluído",
                        label: "Etiqueta Promocional",
                        size: "3cm x 7cm",
                        colors: "Preto e Branco",
                        substrate: "Papel Couche",
                        cut: "Redondo",
                        productId: "12345"
                    }}
                />
                                <CardPedido
                    order={{
                        date: "23 de novembro",
                        number: "1309845",
                        status: "Concluído",
                        label: "Etiqueta Promocional",
                        size: "3cm x 7cm",
                        colors: "Preto e Branco",
                        substrate: "Papel Couche",
                        cut: "Redondo",
                        productId: "12345"
                    }}
                />
                                <CardPedido
                    order={{
                        date: "23 de novembro",
                        number: "1309845",
                        status: "Concluído",
                        label: "Etiqueta Promocional",
                        size: "3cm x 7cm",
                        colors: "Preto e Branco",
                        substrate: "Papel Couche",
                        cut: "Redondo",
                        productId: "12345"
                    }}
                />
                                <CardPedido
                    order={{
                        date: "23 de novembro",
                        number: "1309845",
                        status: "Concluído",
                        label: "Etiqueta Promocional",
                        size: "3cm x 7cm",
                        colors: "Preto e Branco",
                        substrate: "Papel Couche",
                        cut: "Redondo",
                        productId: "12345"
                    }}
                />
                                <CardPedido
                    order={{
                        date: "23 de novembro",
                        number: "1309845",
                        status: "Concluído",
                        label: "Etiqueta Promocional",
                        size: "3cm x 7cm",
                        colors: "Preto e Branco",
                        substrate: "Papel Couche",
                        cut: "Redondo",
                        productId: "12345"
                    }}
                />
            </div>

        </PageContainer>
    );
};

export default Pedidos;