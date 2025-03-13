import CarrinhoComponente from "../components/CarrinhoComponente";
import React, { useState, useEffect } from "react";
import { 
    Container,
    CarrinhoContainer,
    InputContainer,
    MensagemFrete,
    ResumoItem,
    Divisor,
    ResumoTotal,
    BotaoProximo,
    ContainerMain
 } from "./styles/Carrinho.styles";
import { useNavigate } from 'react-router-dom';
import { calcularFrete } from "../utils/frete.js";

const Carrinho = () => {
    const [produtos, setProdutos] = React.useState([]);
    const [frete, setFrete] = useState(0);
    const [freteStatus, setFreteStatus] = useState(null);
    const [freteMensagem, setFreteMensagem] = useState("");
    const [cepInput, setCepInput] = useState("");
    const [desconto, setDesconto] = useState(0);
    const [cupom, setCupom] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const refreshProducts = () => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        const productCounts = {};
        cartProducts.forEach(id => {
            productCounts[id] = (productCounts[id] || 0) + 1;
        });
        const uniqueIds = Object.keys(productCounts);
        Promise.all(
            uniqueIds.map(id =>
                fetch(`https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers/${id}`)
                    .then(response => response.json())
                    .then(data => ({ ...data, quantidade: productCounts[id] }))
            )
        ).then(productsWithQuantity => {
            setProdutos(productsWithQuantity);
        });
    };

    React.useEffect(() => {
        refreshProducts();
        const storedCep = localStorage.getItem('cep');
        if (storedCep) {
            setCepInput(storedCep);
            aplicarFrete();
        }
    }, []);

    const aplicarFrete = () => {
        if (!cepInput.trim()) {
            setFreteMensagem("Por favor, insira um CEP");
            setFreteStatus(false);
            setFrete(0);
            return;
        }

        const resultado = calcularFrete(cepInput);
        setFreteStatus(resultado.status);
        setFreteMensagem(resultado.mensagem);
        setFrete(resultado.valor);

        localStorage.setItem('cep', cepInput);
    };

    const aplicarCupom = () => {
        // Aqui você implementaria a lógica de validação de cupom
        // Por enquanto apenas um placeholder
        if (cupom === "DESCONTO10") {
            setDesconto(totalPrice * 0.1);
        } else {
            setDesconto(0);
        }
    };

    // Função para formatar o CEP automaticamente
    const handleCepChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        setCepInput(value);
    };

    useEffect(() => {
        refreshProducts();
    }, [produtos, cupom]);

    useEffect(() => {
        const newTotalPrice = produtos.reduce(
            (acc, prod) => acc + (prod.price * prod.quantidade),
            0
        );
        setTotalPrice(newTotalPrice);

        if (cupom === "DESCONTO10") {
            setDesconto(newTotalPrice * 0.1);
        } else {
            setDesconto(0);
        }
    }, [produtos, cupom]);

    const handleProximoClick = () => {
        const dataToSave = {
            frete: frete,
            desconto: desconto,
            total: totalPrice + frete - desconto,
            valorCarrinho: totalPrice, // Adiciona o valor do carrinho
            cep: cepInput
        };
        localStorage.setItem('checkoutData', JSON.stringify(dataToSave));
        navigate('/compras/endereco');
    };

    return (
        <ContainerMain>
            <Container>
                <CarrinhoContainer>
                    <h1>Carrinho</h1>
                    <div className="indice-carrinho">
                        <h2>Produto</h2>
                        <h2>Quantidade</h2>
                        <h2>Preço</h2>
                    </div>
                    {produtos.length === 0 ? (
                        <p>Seu carrinho está vazio.</p>
                    ) : (
                        produtos.map((produto, index) => (
                            <React.Fragment key={index}>
                                <CarrinhoComponente 
                                produto={produto} 
                                refreshCart={refreshProducts}  
                                />
                                <div className="divisor"></div>
                            </React.Fragment>
                        ))
                    )}
                </CarrinhoContainer>
                <div className="carrinho-resumo">
                    <h2>Calcular Frete</h2>
                    <InputContainer>
                        <input 
                            type="text" 
                            placeholder="Digite seu CEP" 
                            value={cepInput}
                            onChange={handleCepChange} // atualizado para formatação automática
                        />
                        <button onClick={aplicarFrete}>OK</button>
                    </InputContainer>
                    {freteMensagem && (
                        <MensagemFrete status={freteStatus}>
                            {freteMensagem}
                        </MensagemFrete>
                    )}

                    <h2>Cupom de desconto</h2>
                    <InputContainer>
                        <input 
                            type="text" 
                            placeholder="Digite seu cupom" 
                            value={cupom} 
                            onChange={(e) => setCupom(e.target.value)}
                        />
                        <button onClick={aplicarCupom}>OK</button>
                    </InputContainer>

                    <h2>Resumo da compra</h2>
                    <ResumoItem>
                        <span>Carrinho</span>
                        <span>R$ {totalPrice.toFixed(2)}</span>
                    </ResumoItem>
                    <ResumoItem>
                        <span>Frete</span>
                        <span>R$ {frete.toFixed(2)}</span>
                    </ResumoItem>
                    {desconto > 0 && (
                        <ResumoItem desconto>
                            <span>Desconto</span>
                            <span>- R$ {desconto.toFixed(2)}</span>
                        </ResumoItem>
                    )}
                    <Divisor />
                    <ResumoTotal>
                        <span>Total</span>
                        <span>R$ {(totalPrice + frete - desconto).toFixed(2)}</span>
                    </ResumoTotal>
                    <BotaoProximo disabled={!freteStatus} onClick={handleProximoClick}>Próximo</BotaoProximo>
                </div>
            </Container>
        </ContainerMain>
    );
}

export default Carrinho;