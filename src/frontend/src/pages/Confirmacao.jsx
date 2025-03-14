import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoadMapSteps } from '../components/RoadMapSteps';

// Ícones
import { FaTruck, FaCreditCard } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";

// Estilos (importando do arquivo separado)
import {
    ContainerMain,
    Container,
    Content,
    RoadMap,
    Title,
    GridCard,
    Card,
    BotaoFinalizar,
    CardHeader,
    CardTitle
} from './styles/Confirmacao.styles';

const Confirmacao = () => {
    const navigate = useNavigate();

    // Estados para armazenar dados
    const [products, setProducts] = useState([]);
    const [endereco, setEndereco] = useState({});
    const [checkoutData, setCheckoutData] = useState({});
    const [loading, setLoading] = useState(false);

    // Verifica se o usuário completou a etapa anterior
    useEffect(() => {
        const completedStages = localStorage.getItem('completedStages')
            ? JSON.parse(localStorage.getItem('completedStages'))
            : [];

        if (!completedStages.includes(2)) {
            navigate('/compras/pagamento');
            return;
        }
    }, [navigate]);

    // Carrega os dados do localStorage e faz a busca dos produtos
    useEffect(() => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        const localEndereco = JSON.parse(localStorage.getItem('endereco') || '{}');
        const localCheckoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');

        setEndereco(localEndereco);
        setCheckoutData(localCheckoutData);

        if (cartProducts.length > 0) {
            fetchProducts(cartProducts);
        }
    }, []);

    // Função para buscar detalhes de cada produto na API
    const fetchProducts = async (productIds) => {
        setLoading(true);
        try {
            const promises = productIds.map(async (id) => {
                const response = await fetch(`https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers/${id}`);
                const data = await response.json();
                return data;
            });
            const results = await Promise.all(promises);
            setProducts(results);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Formatação do endereço
    const formatEndereco = () => {
        if (!endereco) return '';
        const {
            cep, rua, numero, complemento, bairro, cidade, estado,
        } = endereco;

        return (
            <div className='endereco'>
                <p><b>Endereço principal</b></p>
                <p>{cep || 'None'}</p>
                <p>{rua || 'None'}, Nº: {numero || 'None'}</p>
                <p>{complemento || 'None'}</p>
                <p>{bairro || 'None'}</p>
                <p>{cidade || 'None'} - {estado || 'None'}</p>
            </div>
        );
    };

    // Formatação do pagamento
    const formatPagamento = () => {
        if (!checkoutData.pagamento) return 'Não definido';
        switch (checkoutData.pagamento) {
            case 'pix':
                return 'Pix';
            case 'boleto':
                return 'Boleto';
            case 'cartao':
            case 'credit_card':
                return 'Cartão de Crédito';
            default:
                return checkoutData.pagamento;
        }
    };

    // Valores
    const subtotal = checkoutData.valorCarrinho || 0;
    const frete = checkoutData.frete || 0;
    const desconto = checkoutData.desconto || 0;
    const total = checkoutData.total || 0;

    // Finalizar compra (exemplo)
    const handleGoToConfirm = () => {

        const completedStages = localStorage.getItem('completedStages') ? JSON.parse(localStorage.getItem('completedStages')) : [];

        completedStages.push(3);
        localStorage.setItem('completedStages', JSON.stringify(completedStages));

        navigate('/compra-finalizada');
    }

    return (
        <ContainerMain>
            <Container>
                {/* Componente de etapas */}
                <RoadMap>
                    <RoadMapSteps />
                </RoadMap>

                <Content>
                    <Title>Confirme suas informações</Title>
                </Content>

                <GridCard>
                    {/* Card 1 - Produtos */}
                    <Card>
                        <CardHeader>
                            <div className='head'>
                                <IoCartOutline size={25} style={{ border: "2px solid #333", padding: "10px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }} />
                                <CardTitle>Produtos</CardTitle>
                            </div>
                        </CardHeader>

                        {loading && <p>Carregando produtos...</p>}
                        {!loading && products.length === 0 && <p>Nenhum produto no carrinho</p>}
                        {!loading && products.length > 0 && (
                            <>
                                <div className='content-carrinho'>
                                    {products.map((prod, index) => (
                                        <div className='product' key={index} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                                            <img
                                                src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png"
                                                alt={prod.name}
                                                style={{ width: 50, height: 50, marginRight: '0.5rem' }}
                                            />
                                            <div>
                                                <p style={{ margin: 0, fontWeight: 'bold' }}>{prod.name}</p>
                                                <p style={{ margin: 0 }}>R$ {prod.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </Card>

                    {/* Card 2 - Endereço/Envio */}
                    <Card>
                        <CardHeader>
                            <div className='head'>
                                <FaTruck size={25} style={{ border: "2px solid #333", padding: "10px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }} />
                                <CardTitle>Envio</CardTitle>
                            </div>
                        </CardHeader>
                        {formatEndereco()}
                        <div className='frete'>
                            <p>Forma de envio: Sedex</p>
                            <p>Valor do frete: R$ {frete}</p>
                        </div>
                    </Card>

                    {/* Card 3 - Pagamento/Resumo */}
                    <Card>
                        <CardHeader>
                            <div className='head'>
                                <FaCreditCard size={25} style={{ border: "2px solid #333", padding: "10px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }} />
                                <CardTitle>Pagamento</CardTitle>
                            </div>
                        </CardHeader>
                        <div className='metodopag'>
                            < FaCreditCard style={{ marginRight: '0.5rem', color: '#333333f8' }} />
                            Método: {formatPagamento()}
                        </div>
                        <div className='valor'>
                            <div className='total'>
                                <p>Subtotal: R$ {subtotal}</p>
                                <p>Desconto: R$ {desconto}</p>
                                <p>Frete: R$ {frete}</p>
                            </div>
                            <div className='valorfinal'>Total: R$ {total}</div>
                        </div>
                    </Card>
                </GridCard>

                <div className="finalizar-compra-botao">
                    <BotaoFinalizar onClick={handleGoToConfirm} disabled={false}>
                        Finalizar compra
                    </BotaoFinalizar>
                </div>
            </Container>
        </ContainerMain>
    );
};

export default Confirmacao;
