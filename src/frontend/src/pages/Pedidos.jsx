import React from 'react';
import { IoCubeOutline } from "react-icons/io5";
import CardPedido from '../components/CardPedido';
import { PageContainer, HeaderSection } from './styles/Pedidos.styles';

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