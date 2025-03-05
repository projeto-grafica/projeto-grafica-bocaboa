import BannerPromotions from "../components/BannerPromotions";
import styled from "styled-components";
import BlockCards from "../components/BlockCards";
import ImageBanner from "../assets/image.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
`

const Home = () => {
    return (
        <Container>
            <BannerPromotions Image={ImageBanner} />
            <BlockCards title={"Em alta"} />
            <BlockCards title={"Para você"} />
        </Container>
    );
}

export default Home;