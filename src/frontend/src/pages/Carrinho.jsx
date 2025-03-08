import styled from "styled-components";
import CarrinhoComponente from "../components/CarrinhoComponente";
import React, { useEffect } from "react";

const produtos = [
    {
        imagem: 'https://d1br4h274rc9sc.cloudfront.net/content/adesivo_redondo_1_ac420d46a8.webp',
        titulo: 'Etiqueta',
        tamanho: '3cm x 7cm',
        cores: 'Preto e Branco',
        substrato: 'Papel Couche',
        corte: 'Redondo',
        quantidade: 1,
        precoTotal: '120,00',
        precoUnitario: '12,00'
    }
];

const Carrinho = () => {
    const [produtos, setProdutos] = React.useState([]);
    const [id, setId] = React.useState(0);

    useEffect(() => {
        const produtosCarrinho = localStorage.getItem('produtosCarrinho');
        if (produtosCarrinho) {
            for (let i = 0; i < produtosCarrinho.length; i++) {
                setId([...produtos, produtosCarrinho[i]]);
            }
        }
    }, [id]);

    useEffect(() => {
        fetch('https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers')
            .then(response => response.json())
            .then(data => setProdutos(data.items));
    } , [produtos]);

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
                        <CarrinhoComponente produto={produto} />
                        <div className="divisor"></div>
                    </React.Fragment>
                ))}
            </CarrinhoContainer>
            <div className="carrinho-resumo">
                {/* Adicione o conteúdo do resumo do carrinho aqui */}
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
        width: 20dvw;
        border-radius: 10px;
        padding: 20px;
        height: 45dvh;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

    }
`

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
            align-items: center;
            justify-content: center;
            padding: 5px 0;
            color: #888888;
        }
    }

    .divisor {
        width: 95%;
        border-bottom: 1px solid #e0e0e0;   
    }
`

export default Carrinho;