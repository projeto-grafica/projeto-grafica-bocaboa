import styled from "styled-components";
import { IoStar } from "react-icons/io5";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 16vw;
    height: 55vh;
    padding: 1vw;
    border-radius: 10px;
    justify-content: start;
    gap: 3vh;

    .img {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: gray;
        width: 100%;
        height: 65%;
        border-radius: 8px;
    }
    
    .rate{
        display: flex;
        justify-content: start;
        gap: 1.5px;
        align-items: center;

        .starQuantity{
            margin: 0;
            font-size: 10px;
            font-weight: 400;
            color: #2E2E30;
            height: 10px;
        }
        
        .rateQuantity{
            margin: 0;
            font-size: 10px;
            font-weight: 300;
            color: #2E2E30;
            height: 10px;
        }        
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 5px;

        p {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
            color: #2E2E30;
        }
    }
`

const ProdutCard = () => {
    return (
        <Container>
            <div className="img"></div>
            <div className="info">
                <div className="rate">
                    <IoStar size={14} color="#F27E16"/>
                    <IoStar size={14} color="#F27E16"/>
                    <IoStar size={14} color="#F27E16"/>
                    <IoStar size={14} color="#F27E16"/>
                    <IoStar size={14} color="#F27E16"/>
                    <p className="starQuantity">5</p>
                    <p className="rateQuantity">(4.200)</p>
                </div>
                <p>titulo</p>
                <p>preço</p>
            </div>
        </Container>
    );
};

export default ProdutCard;