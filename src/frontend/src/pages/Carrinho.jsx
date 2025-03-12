import styled from "styled-components";
import CarrinhoComponente from "../components/CarrinhoComponente";
import React, { useState } from "react";
import { 
    Container,
    CarrinhoContainer,
    InputContainer,
    MensagemFrete,
    ResumoItem,
    Divisor,
    ResumoTotal,
    BotaoProximo
 } from "./styles/Carrinho.styles";

const calcularFrete = (cepDestino) => {
  // CEP da gráfica
  const cepOrigem = "13206-020";
  
  // Função para verificar se o CEP é de Jundiaí
  const ehJundiai = (cep) => {
    // CEPs de Jundiaí começam com 132
    return cep.startsWith("132");
  };
  
  // Função para verificar se o CEP é da capital de São Paulo
  const ehSaoPauloCapital = (cep) => {
    // CEPs da capital de São Paulo começam com '01' até '05'
    const prefixo = cep.substring(0, 2);
    return ['01', '02', '03', '04', '05'].includes(prefixo);
  };
  
  // Função para calcular a distância aproximada entre CEPs
  const calcularDistanciaKm = (cepOrigem, cepDestino) => {
    // Em uma implementação real, você usaria uma API de geolocalização
    // Para demonstração, vamos supor uma distância baseada na diferença dos CEPs
    if (ehJundiai(cepDestino)) {
      // Diferença de CEPs dentro de Jundiaí - simplificação para exemplo
      const numOrigem = parseInt(cepOrigem.replace('-', '').substring(3));
      const numDestino = parseInt(cepDestino.replace('-', '').substring(3));
      const diferenca = Math.abs(numOrigem - numDestino);
      // Simulando que cada 1000 unidades de diferença equivale a 5km
      return Math.ceil(diferenca / 1000) * 5;
    }
    
    return 20; // Distância padrão para outros locais que serão atendidos
  };
  
  // Limpar o CEP para processamento
  const cepLimpo = cepDestino.replace(/\D/g, '');
  
  // Verificar se o CEP tem o formato correto
  if (cepLimpo.length !== 8) {
    return {
      status: false,
      mensagem: "CEP inválido. Por favor, insira um CEP válido.",
      valor: 0
    };
  }
  
  // Aplicar as regras específicas
  
  // 1. Se for São Paulo Capital, frete fixo de 30 reais
  if (ehSaoPauloCapital(cepLimpo)) {
    return {
      status: true,
      mensagem: "Entrega para São Paulo capital: frete fixo.",
      valor: 30
    };
  }
  
  // 2. Se for em Jundiaí, calcula o frete baseado na distância
  if (ehJundiai(cepLimpo)) {
    const distanciaKm = calcularDistanciaKm(cepOrigem.replace(/\D/g, ''), cepLimpo);
    const valorFrete = Math.ceil(distanciaKm / 5) * 5; // A cada 5km, 5 reais
    
    return {
      status: true,
      mensagem: `Entrega para Jundiaí: ${distanciaKm}km de distância.`,
      valor: valorFrete
    };
  }
  
  // 3. Para outros locais, não há entrega disponível
  return {
    status: false,
    mensagem: "Desculpe, não realizamos entregas para esta localidade.",
    valor: 0
  };
};

const Carrinho = () => {
    const [produtos, setProdutos] = React.useState([]);
    const [frete, setFrete] = useState(0);
    const [freteStatus, setFreteStatus] = useState(null);
    const [freteMensagem, setFreteMensagem] = useState("");
    const [cepInput, setCepInput] = useState("");
    const [desconto, setDesconto] = useState(0);
    const [cupom, setCupom] = useState("");

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
    }, []);

    const totalPrice = produtos.reduce(
        (acc, prod) => acc + (prod.price * prod.quantidade),
        0
    );

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

    return (
        <Container>
            <CarrinhoContainer>
                <h1>Carrinho</h1>
                <div className="indice-carrinho">
                    <h2>Produto</h2>
                    <h2>Quantidade</h2>
                    <h2>Preço</h2>
                </div>
                {produtos.map((produto, index) => (
                    <React.Fragment key={index}>
                        <CarrinhoComponente 
                          produto={produto} 
                          refreshCart={refreshProducts}  
                        />
                        <div className="divisor"></div>
                    </React.Fragment>
                ))}
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
                <BotaoProximo disabled={!freteStatus}>Próximo</BotaoProximo>
            </div>
        </Container>
    );
}

export default Carrinho;