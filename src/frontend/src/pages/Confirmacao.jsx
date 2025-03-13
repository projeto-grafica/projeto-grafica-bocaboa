import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoadMapSteps } from '../components/RoadMapSteps';
import { ContainerMain, Container, Content, RoadMap, Title, GridCard, Card, BotaoFinalizar } from './styles/Confirmacao.styles.jsx';
const Confirmacao = () => {
    const navigate = useNavigate();
    const [CountCarrinho, setCountCarrinho] = useState(0);

    useEffect(() => {
        // Verifica se o usuário completou a etapa anterior
        const completedStages = localStorage.getItem('completedStages') ? JSON.parse(localStorage.getItem('completedStages')) : [];
        if (!completedStages.includes(2)) {
            navigate('/compras/pagamento');
            return;
        }
    }, []);

    return (
        <ContainerMain>
            <Container>
                <RoadMap>
                    <RoadMapSteps />
                </RoadMap>
                <Content>
                    <Title>Confirme suas informações</Title>
                </Content>
                <GridCard>
                    <Card>
                        <h3>Endereço de entrega</h3>
                        <p>Rua dos Bobos, 0</p>
                        <p>Bairro: Bobo</p>
                        <p>Cidade: Bobolândia</p>
                        <p>CEP: 00000-000</p>
                    </Card>
                    <Card>
                        <h3>Forma de pagamento</h3>
                        <p>Cartão de crédito</p>
                        <p>**** **** **** 1234</p>
                        <p>Nome: Fulano de Tal</p>
                        <p>Validade: 12/2024</p>
                    </Card>
                    <Card>
                        <h3>Forma de pagamento</h3>
                        <p>Cartão de crédito</p>
                        <p>**** **** **** 1234</p>
                        <p>Nome: Fulano de Tal</p>
                        <p>Validade: 12/2024</p>
                    </Card>
                </GridCard >
                <div className='finalizar-compra-botao'>
                    <BotaoFinalizar onClick={setCountCarrinho} disabled={false}>
                        Finalizar compra
                    </BotaoFinalizar>
                </div>
            </Container>
        </ContainerMain>
    );
}

export default Confirmacao;