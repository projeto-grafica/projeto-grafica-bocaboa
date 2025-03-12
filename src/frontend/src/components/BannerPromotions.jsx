import styled from "styled-components";
import { ContainerPromotions } from "./styles/BannerPromotions.style";

// Componente de banner de promoções
const BannerPromotions = ({ Image }) => {
    return (
        <ContainerPromotions>
            <img src={Image} alt="Promotions" />
        </ContainerPromotions>
    );
}

export default BannerPromotions;