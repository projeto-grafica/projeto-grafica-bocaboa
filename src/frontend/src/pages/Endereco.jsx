import React, { useState, useEffect } from 'react';
import { Container, RoadMap, Content, FormEndereco as FormEnderecoStyled, ResumePayment } from './styles/Endereco.styles.jsx';
import { RoadMapSteps } from '../components/RoadMapSteps.jsx'; 
import FormEndereco from '../components/FormEndereco.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CarrinhoResumo, ResumoItem, Divisor, ResumoTotal } from './styles/Endereco.styles.jsx';

const Endereco = () => {
    const [checkoutData, setCheckoutData] = useState({ frete: 0, desconto: 0, total: 0 });
    const [cep, setCep] = useState('');
    const [CountCarrinho, setCountCarrinho] = useState(0);

    useEffect(() => {
        const storedData = localStorage.getItem('checkoutData');
        if (storedData) {
            setCheckoutData(JSON.parse(storedData));
        }

        const CountCarrinho = JSON.parse(localStorage.getItem('cartProducts') || '[]').length;
        setCountCarrinho(CountCarrinho);

        const storedCep = localStorage.getItem('cep');
        if (storedCep) {
            setCep(storedCep);
        }
    }, []);

    return (
        <Container>
            <RoadMap>
                <RoadMapSteps />
            </RoadMap>
            <Content>
                <FormEnderecoStyled>
                    <FormEndereco cep={cep}/>
                </FormEnderecoStyled>
                <ResumePayment>
                    <CarrinhoResumo>
                        <h2>
                            <Link to="/carrinho" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', fontSize: '16px' }}>
                                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                                Ver Carrinho                                
                            </Link>
                        </h2>
                        <p style={{ fontSize: '14px', color: '#777'}}>
                            {` (${CountCarrinho} itens)`}
                        </p>

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
                    </CarrinhoResumo>
                </ResumePayment>
            </Content>
        </Container>
    );
}

export default Endereco;