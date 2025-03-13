import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, RoadMap, Content, ContentPayments, ResumePayment, CarrinhoResumo, ResumoItem, Divisor, ResumoTotal, BotaoProximo } from './styles/Endereco.styles.jsx';
import { RoadMapSteps } from '../components/RoadMapSteps.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PaymentMethodSelection from '../components/PaymentMethodSelection.jsx';

const Pagamento = () => {
    const navigate = useNavigate();
    const [checkoutData, setCheckoutData] = useState({ frete: 0, desconto: 0, total: 0 });
    const [CountCarrinho, setCountCarrinho] = useState(0);
    const [allowNext, setAllowNext] = useState(false);
    const [pagamentoMetodo, setPagamentoMetodo] = useState('');

    useEffect(() => {
        const completedStages = localStorage.getItem('completedStages') ? JSON.parse(localStorage.getItem('completedStages')) : [];
        if (!completedStages.includes(0)) {
            navigate('/carrinho');
            return;
        }

        const storedData = localStorage.getItem('checkoutData');
        if (storedData) {
            setCheckoutData(JSON.parse(storedData));
        }

        const CountCarrinho = JSON.parse(localStorage.getItem('cartProducts') || '[]').length;
        setCountCarrinho(CountCarrinho);


    }, []);

    const handleGoToConfirm = () => {
        const storedData = localStorage.getItem('checkoutData');
        if (storedData) {
            const checkoutData = JSON.parse(storedData);
            checkoutData.pagamento = pagamentoMetodo;
            localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        }

        const completedStages = localStorage.getItem('completedStages') ? JSON.parse(localStorage.getItem('completedStages')) : [];

        completedStages.push(2);
        localStorage.setItem('completedStages', JSON.stringify(completedStages));

        navigate('/compras/confirmacao');
    }

    return (
        <Container>
            <RoadMap>
                <RoadMapSteps />
            </RoadMap>
            <Content>
                <ContentPayments>
                    <PaymentMethodSelection allow={setAllowNext} pagamentoMetodo={setPagamentoMetodo}/>
                </ContentPayments>
                <ResumePayment>
                    <CarrinhoResumo>
                        <div className='carrinho-resumo-header'>
                            <h2>
                                <Link to="/carrinho" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', fontSize: '16px' }}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                                    Ver Carrinho
                                </Link>
                            </h2>
                            <p style={{ fontSize: '14px', color: '#777' }}>
                                {` (${CountCarrinho} itens)`}
                            </p>
                        </div>

                        <Divisor />

                        <ResumoItem>
                            <span>Carrinho</span>
                            <span>R$ {checkoutData.valorCarrinho}</span>
                        </ResumoItem>
                        <ResumoItem>
                            <span>Frete</span>
                            <span>R$ {checkoutData.frete.toFixed(2)}</span>
                        </ResumoItem>
                        <ResumoItem>
                            <span>Desconto</span>
                            <span>- R$ {checkoutData.desconto.toFixed(2)}</span>
                        </ResumoItem>
                        <Divisor />
                        <ResumoTotal>
                            <span>Total</span>
                            <span>R$ {checkoutData.total.toFixed(2)}</span>
                        </ResumoTotal>
                        <BotaoProximo onClick={handleGoToConfirm} disabled={!allowNext}>
                            <span>Próximo</span>
                        </BotaoProximo>
                    </CarrinhoResumo>
                </ResumePayment>
            </Content>
        </Container>
    );
}

export default Pagamento;