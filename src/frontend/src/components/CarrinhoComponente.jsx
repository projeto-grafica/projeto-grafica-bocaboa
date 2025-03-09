import styled from "styled-components";
import React from "react";

const CarrinhoComponente = ({ produto }) => {
  const [quantity, setQuantity] = React.useState(produto.quantidade);
  const handleIncrement = () => {
    const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cart.push(produto.sticker_id);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const index = cart.indexOf(produto.sticker_id);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cartProducts", JSON.stringify(cart));
      setQuantity(quantity - 1);
    }
  };

  const imageUrl = produto?.images?.length ? produto.images[0] : "https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png";
  
  return (
      <Container>
          <ProductCard>
              <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }}>
              </ImageContainer>

              <ProductInfo>
                  <Title>{produto.name}</Title>
                  <Specs>Tamanho: {produto.width} x {produto.height}</Specs>
                  <Specs>Cores: {produto.color}</Specs>
                  <Specs>Substrato: {produto.paperType}</Specs>
                  <Specs>Corte: {produto.shape}</Specs>
              </ProductInfo>

              <QuantityContainer>
                  <QuantityControls>
                      <QuantityButton onClick={handleDecrement}>-</QuantityButton>
                      <QuantityDisplay>{quantity}</QuantityDisplay>
                      <QuantityButton onClick={handleIncrement}>+</QuantityButton>
                  </QuantityControls>
                  <RemoveButton>
                      Remover
                  </RemoveButton>
              </QuantityContainer>

              <Price>
                  <MainPrice>R$ {produto.price * quantity}</MainPrice>
                  <UnitPrice>R$ {produto.price/100} cada</UnitPrice>
              </Price>
          </ProductCard>
      </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 51.5vw;
  height: 18vh;
  margin: 3vh 0;
`;

const ProductCard = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
`;

const ImageContainer = styled.div`
  height: 18vh;
    width: 18vh;
  background-image: url('https://d1br4h274rc9sc.cloudfront.net/content/adesivo_redondo_1_ac420d46a8.webp');
  border-radius: 8px;
    background-size: cover;
    background-position: center;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  color: #333333;
`;

const Specs = styled.p`
  margin: 5px 0;
  color: #666666;
  font-size: 12px;
`;

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #eee;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const QuantityDisplay = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
`;

const Price = styled.div`
  text-align: right;
  min-width: 120px;
`;

const MainPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

const UnitPrice = styled.div`
  font-size: 12px;
  color: #666666;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
    color: #ff4444;
  }
`;

export default CarrinhoComponente;