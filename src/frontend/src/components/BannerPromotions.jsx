import styled from "styled-components";

// Componente de banner de promoções
const BannerPromotions = ({ Image }) => {
    return (
        <ContainerPromotions>
            <img src={Image} alt="Promotions" />
        </ContainerPromotions>
    );
}

// Estilização do container de promoções
const ContainerPromotions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F27E16;
    width: 85vw;
    height: 55vh;
    align-self: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default BannerPromotions;