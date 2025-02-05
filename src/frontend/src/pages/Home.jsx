import BannerPromotions from "../components/BannerPromotions";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
`

const Home = () => {
    return (
        <Container>
            <BannerPromotions Image={"https://ceoptions.com/wp-content/uploads/2021/09/Promotional-Marketing-Strategies-to-Boost-Sales.jpg"} />
        </Container>
    );
}

export default Home;