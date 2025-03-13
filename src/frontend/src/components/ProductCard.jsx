import { IoStar } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Container } from './styles/ProductCard.styles';

const ProdutCard = ({ data }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('lastAcess', data.sticker_id);        
        navigate(`/produto/${data.tipo}`);
    };

    return (
        <Container onClick={handleClick}>
            <div className="img">
                {data?.promotion_id && ( 
                    <div className="promotionTag">
                        <p className="promotionText">-{data.promotion_id}%</p>
                    </div>
                )}
            </div>
            <div className="info">
                <div className="rate">
                    <IoStar size={14} color="#F27E16" />
                    <IoStar size={14} color="#F27E16" />
                    <IoStar size={14} color="#F27E16" />
                    <IoStar size={14} color="#F27E16" />
                    <IoStar size={14} color="#F27E16" />
                    <p className="starQuantity">5</p>
                    <p className="rateQuantity">(4.200)</p>
                </div>
                <p>{data?.name}</p>
                <p className="priceText">a partir de</p>
                <p className="price"><b>R${data?.price ? parseFloat(data.price).toFixed(2) : '0.00'}</b> / 100 un</p>
            </div>
        </Container>
    );
}

export default ProdutCard;