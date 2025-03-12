import React from "react";
import {
  Container,
  ProductCard,
  ImageContainer,
  ProductInfo,
  Title,
  Specs,
  QuantityContainer,
  QuantityControls,
  QuantityButton,
  QuantityDisplay,
  Price,
  MainPrice,
  UnitPrice,
  RemoveButton,
} from "./styles/CarrinhoComponente.styles";

const CarrinhoComponente = ({ produto, refreshCart }) => {
  const [quantity, setQuantity] = React.useState(produto.quantidade);

  if (quantity === 0) return null;
  
  const handleIncrement = () => {
    const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cart.push(produto.sticker_id);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    setQuantity(quantity + 1);
    if (refreshCart) refreshCart();
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const index = cart.indexOf(produto.sticker_id);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cartProducts", JSON.stringify(cart));
      setQuantity(quantity - 1);
      if (refreshCart) refreshCart();
    }
  };

  const imageUrl = produto?.images?.length ? produto.images[0] : "https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png";
  
  return (
      <Container>
          <ProductCard>
            <div className="product-info-container">
              <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }}></ImageContainer>

              <ProductInfo>
                  <Title>{produto.name}</Title>
                  <Specs>Tamanho: {produto.width} x {produto.height}</Specs>
                  <Specs>Cores: {produto.color}</Specs>
                  <Specs>Substrato: {produto.paperType}</Specs>
                  <Specs>Corte: {produto.shape}</Specs>
              </ProductInfo>
            </div>

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
                  <MainPrice>R$ {(produto.price * quantity).toFixed(2)}</MainPrice>
                  <UnitPrice>R$ {(produto.price/100).toFixed(2)} cada</UnitPrice>
              </Price>
          </ProductCard>
      </Container>
  );
}

export default CarrinhoComponente;