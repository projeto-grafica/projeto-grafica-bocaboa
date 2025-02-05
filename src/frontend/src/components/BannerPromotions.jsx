import styled from "styled-components";

const ContainerPromotions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F27E16;
    width: 85vw;
    height: 55vh;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const BannerPromotions = ({ Image }) => {
    return (
        <ContainerPromotions>
            <img src={Image} alt="Promotions" />
        </ContainerPromotions>
    );
}

export default BannerPromotions;