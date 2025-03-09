import BannerPromotions from "../components/BannerPromotions";
import styled from "styled-components";
import BlockCards from "../components/BlockCards";
import ImageBanner from "../assets/image.png";
import { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 5vh;
    width: 100%;
`

const Home = () => {
    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        fetch('https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers')
            .then(response => response.json())
            .then(data => setStickers(data.items));
    }, []);   


    return (
        <Container>
            <BannerPromotions Image={ImageBanner} />
            <BlockCards title={"Em alta"} stickers={stickers} />
            <BlockCards title={"Para você"} stickers={stickers} />
        </Container>
    );
}

export default Home;