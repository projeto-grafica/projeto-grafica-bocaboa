import styled from "styled-components";
import CarrinhoComponente from "../components/CarrinhoComponente";
import React, { useEffect, useState } from "react";

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

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5dvh 7.5dvw;

    .carrinho-resumo {
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 22dvw;
        border-radius: 10px;
        padding: 25px;
        height: fit-content;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

        h2 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
            margin-top: 15px;
            color: #333;
        }

        h2:first-child {
            margin-top: 0;
        }
    }
`;

const CarrinhoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 54dvw;
    background-color: white;
    border-radius: 10px;
    min-height: 70dvh;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    padding: 0 2dvw;

    h1 {
        margin-top: 4dvh;
        width: 95%;
        font-size: 18px;
        font-weight: 500;
    }

    .indice-carrinho {
        width: 95%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e0e0e0;

        h2 {
            margin: 0;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            padding: 5px 0;
            color: #888888;
        }

        h2:nth-child(1) {
            width: 60%;
            justify-content: flex-start;
        }

        h2:nth-child(2) {
            width: 20%;
            justify-content: center;
        }

        h2:nth-child(3) {
            width: 20%;
            justify-content: end;
        }
    }

    .divisor {
        width: 95%;
        border-bottom: 1px solid #e0e0e0;   
    }
`;

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;

    input {
        flex: 1;
        border: none;
        border-radius: 10px 0 0 10px;
        padding: 0 10px;
        background-color: #F7F7F7;
        outline: none;
    }

    button {
        width: 40px;
        background-color: #F7F7F7;
        border: none;
        border-radius: 0 10px 10px 0;
        border-left: 1px solid #e0e0e0;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #4CAF50;
            color: white;
        }
    }
`;

const MensagemFrete = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
    color: ${props => props.status ? '#4CAF50' : '#f44336'};
`;

const ResumoItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    span {
        font-size: 14px;
        color: ${props => props.desconto ? '#4CAF50' : '#333'};
    }
`;

const Divisor = styled.div`
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    margin: 10px 0;
`;

const ResumoTotal = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-weight: 500;
    
    span {
        font-size: 16px;
    }
`;

const BotaoProximo = styled.button`
    width: 100%;
    height: 35px;
    background-color: ${props => props.disabled ? '#cccccc' : '#4CAF50'};
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 20px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-weight: 500;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.disabled ? '#cccccc' : '#45a049'};
    }
`;

export default Carrinho;