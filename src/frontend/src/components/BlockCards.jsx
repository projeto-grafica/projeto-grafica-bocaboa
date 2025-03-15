import ProdutCard from "./ProductCard";
import { Container } from "./styles/BlockCards.style";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';

const BlockCards = ({ title, stickers }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1.4 : 4.525,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.9,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <Container>
            <p>{title}</p>
            <div className="slider-container">
                <Slider {...sliderSettings}>
                    {stickers && stickers.map((sticker, index) => (
                        <div className="card-wrapper" key={index}>
                            <ProdutCard data={sticker} />
                        </div>
                    ))}
                </Slider>
            </div>
        </Container>
    );
}

export default BlockCards;