import React, { useState, useEffect } from 'react';
import { Container, RoadMap, Content, FormEndereco as FormEnderecoStyled, ResumePayment } from './styles/Endereco.styles.jsx';
import { RoadMapSteps } from '../components/RoadMapSteps.jsx';
import FormEndereco from '../components/FormEndereco.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CarrinhoResumo, ResumoItem, Divisor, ResumoTotal, BotaoProximo } from './styles/Endereco.styles.jsx';
import { useNavigate } from 'react-router-dom';

const Endereco = () => {
    const [checkoutData, setCheckoutData] = useState({ frete: 0, desconto: 0, total: 0 });
    const [cep, setCep] = useState('');
    const [CountCarrinho, setCountCarrinho] = useState(0);
    const [allowNext, setAllowNext] = useState(false);
    const navigate = useNavigate();

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

        const storedCep = localStorage.getItem('cep');
        if (storedCep) {
            setCep(storedCep);
        }
    }, []);

    const handleProximoClick = () => {
        const completedStages = localStorage.getItem('completedStages') ? JSON.parse(localStorage.getItem('completedStages')) : [];
        
        // Recupera os dados do checkout do localStorage
        const storedCheckoutData = localStorage.getItem('checkoutData');
        let checkoutData = storedCheckoutData ? JSON.parse(storedCheckoutData) : {};
        
        // Salva os dados atualizados no localStorage
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

        // Recupera os dados do formulário de endereço do localStorage
        const storedEndereco = localStorage.getItem('endereco');

        // Se já existir, remove para garantir que os dados sejam frescos
        if (storedEndereco) {
            localStorage.removeItem('endereco');
        }

        // Salva os dados do formulário de endereço no localStorage
        const enderecoData = JSON.stringify({
            cep: localStorage.getItem('cep'),
            rua: localStorage.getItem('rua'),
            numero: localStorage.getItem('numero'),
            complemento: localStorage.getItem('complemento'),
            bairro: localStorage.getItem('bairro'),
            cidade: localStorage.getItem('cidade'),
            estado: localStorage.getItem('estado')
        });
        localStorage.setItem('endereco', enderecoData);

        completedStages.push(2);
        localStorage.setItem('completedStages', JSON.stringify(completedStages));

        navigate('/compras/pagamento');
    };

    return (
        <Container>
            <RoadMap>
                <RoadMapSteps />
            </RoadMap>
            <Content>
                <FormEnderecoStyled>
                    <FormEndereco cep={cep} setNext={setAllowNext}/>
                </FormEnderecoStyled>
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
                        <BotaoProximo disabled={!allowNext} onClick={handleProximoClick}>Próximo</BotaoProximo>
                    </CarrinhoResumo>
                </ResumePayment>
            </Content>
        </Container>
    );
}

export default Endereco;