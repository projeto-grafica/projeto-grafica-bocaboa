import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 650px;
  margin: 20px 0;
`;

export const ProductCard = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  .product-info-container{
    display: flex;
    align-items: center;
    gap: 20px;
    width: 60%;
  }
`;

export const ImageContainer = styled.div`
  height: 100px;
    width: 100px;
  background-image: url('https://d1br4h274rc9sc.cloudfront.net/content/adesivo_redondo_1_ac420d46a8.webp');
  border-radius: 8px;
    background-size: cover;
    background-position: center;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  color: #333333;
`;

export const Specs = styled.p`
  margin: 5px 0;
  color: #666666;
  font-size: 12px;
`;

export const QuantityContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px;
  gap: 10px;
`;

export const QuantityButton = styled.button`
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

export const QuantityDisplay = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
`;

export const Price = styled.div`
  width: 20%;
  text-align: right;
`;

export const MainPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

export const UnitPrice = styled.div`
  font-size: 12px;
  color: #666666;
`;

export const RemoveButton = styled.button`
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
