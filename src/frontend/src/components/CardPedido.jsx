import { Link } from "react-router-dom";
import {
    CardPedidoContainer,
    Header,
    OrderInfo,
    Status,
    DetailsContainer,
    DetailItem,
    DetailLabel,
    DetailTitle,
    DetailValue,
    Actions,
    ActionLink
} from './styles/CardPedido.style'

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

export default CardPedido;