import styled from "styled-components";
import ProdutCard from "./ProductCard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 85vw;
    margin-top: 5vh;

    p {
        font-size: 22px;
        font-weight: 700;
        color: #2E2E30;
        margin: 0;
        margin-bottom: 20px;
    }

    .cards{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`

const BlockCards = ({title}) => {
    return (
        <Container>
            <p>{title}</p>
            <div className="cards">
                <ProdutCard/>
                <ProdutCard/>
                <ProdutCard/>
                <ProdutCard/>
                
            </div>
        </Container>
    );
}

export default BlockCards;