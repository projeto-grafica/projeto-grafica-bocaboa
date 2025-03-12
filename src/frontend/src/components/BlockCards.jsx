import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProdutCard from "./ProductCard";
import { Container } from "./styles/BlockCards.style";

const BlockCards = ({ title, stickers }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    let cardList = stickers;
    if (stickers.length < 4) {
        cardList = [...stickers, ...stickers];
    }
    const itemsPerPage = 4;
    const totalOriginal = stickers.length;
    const slideStep = 22.3; 

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, totalOriginal - itemsPerPage));
    };
    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    return (
        <Container>
            <p>{title}</p>
            {currentIndex > 0 && (
                <button className="arrow arrow-left" onClick={handlePrev}>
                    <IoIosArrowBack size={24} color="#2E2E30" />
                </button>
            )}
            <div className="carousel-container">
                <div className="carousel-wrapper"> {/* container centralizado */}
                    <div
                        className="cards"
                        style={{
                            transform: `translateX(-${currentIndex * slideStep}vw)`,
                        }}
                    >
                        {cardList && cardList.map((sticker, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "18vw",
                                    ...(index === 0 && { marginLeft: "9.1vw" })
                                }}
                            >
                                <ProdutCard
                                    data={sticker}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {stickers && (stickers.length > currentIndex + itemsPerPage) && (
                <button className="arrow arrow-right" onClick={handleNext}>
                    <IoIosArrowForward size={24} color="#2E2E30" />
                </button>
            )}
        </Container>
    );
}

export default BlockCards;