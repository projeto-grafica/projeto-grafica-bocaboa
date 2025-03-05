import styled from "styled-components";
import { Link } from "react-router-dom";

// Componente de cartão de pedido
const CardPedido = ({ order }) => {
    return (
        <CardPedidoContainer>
            <Header>
                <OrderInfo>
                    {order.date} - Pedido {order.number}
                </OrderInfo>
                <Status>{order.status}</Status>
            </Header>

            <div className="card-body">
                <div className="card-content">
                    <img src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png" alt="test" />
                    <DetailsContainer>
                        <DetailItem>
                            <DetailTitle>Etiqueta</DetailTitle>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Tamanho:</DetailLabel>
                            <DetailValue>{order.size}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Cores:</DetailLabel>
                            <DetailValue>{order.colors}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Substrato:</DetailLabel>
                            <DetailValue>{order.substrate}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Corte:</DetailLabel>
                            <DetailValue>{order.cut}</DetailValue>
                        </DetailItem>
                    </DetailsContainer>
                </div>

                <Actions>
                    <ActionLink to={`/pedidos/${order.number}`}>Ver detalhes</ActionLink>
                    <ActionLink to={`/produto/${order.productId}`}>Comprar novamente</ActionLink>
                </Actions>
            </div>

        </CardPedidoContainer>
    );
}

// Estilização dos componentes do cartão de pedido
const CardPedidoContainer = styled.div`
  width: 65vw;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .card-content {
        display: flex;
        gap: 1.5rem;
        align-items: end;
    
        img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 10px;
        }
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #C8C8C8;
`;

const OrderInfo = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #2e2e2e;
`;

const Status = styled.span`
  width: 8vw;
  height: 3vh;
  border-radius: 10px;
  background-color: #00a65038;
  color: #00a650;
  font-weight: 500;
  font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DetailsContainer = styled.div`
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: start;
  gap: 1vw;
  margin-bottom: 0.8vh;
  font-size: 12px;
`;

const DetailLabel = styled.span`
  color: #666;
  margin: 0;
`;

const DetailTitle = styled.span`
    color: #2e2e30;
    font-weight: 500;
    font-size: 16px;
`

const DetailValue = styled.span`
  color: #666;
  font-weight: 500;
    margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  color: #2e2e309d;
  font-weight: 500;
  font-size: 14px;
  transition: opacity 0.2s;
  border: 1px solid #2e2e30ab;
  width: 15vw;
  height: 5vh;
  display: flex;  
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export default CardPedido;