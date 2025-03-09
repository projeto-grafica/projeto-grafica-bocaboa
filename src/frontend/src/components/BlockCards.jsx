import { useState } from 'react';
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProdutCard from "./ProductCard";

const BlockCards = ({ title, stickers }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    let cardList = stickers;
    if (stickers.length < 4) {
        cardList = [...stickers, ...stickers];
    }
    const itemsPerPage = 4;
    const totalOriginal = stickers.length;
    // Slide step: 18vw (card) + 4.3vw (gap) = 22.3vw
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-top: 5vh;
    position: relative;

    p {
        font-size: 22px;
        font-weight: 700;
        color: #2E2E30;
        margin: 0;
        margin-bottom: 15px;
        margin-left: 7.5vw;
    }

    .carousel-container {
        width: 100%;
        position: relative;
        overflow: hidden;
        padding: 0;
    }

    .carousel-wrapper {
        width: 88vw;
        margin: 0 auto;
        overflow: hidden;
    }

    .cards {
        display: flex;
        align-items: center;
        transition: transform 0.5s ease-in-out;
        width: 100vw;
        height: 26.5vw;
        gap: 4.3vw;
        margin-left: -7.5vw;                  
    }

    .arrow {
        position: absolute;
        top: 50%;                   /* centraliza verticalmente */
        transform: translateY(-50%);
        background: white;
        border: 1px solid #ddd;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        z-index: 1;
        transition: all 0.3s;
        
        &:hover {
            background: #f5f5f5;
            transform: translateY(-50%) scale(1.05);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .arrow-left {
        left: 20px; /* fixa à esquerda */
    }

    .arrow-right {
        right: 20px; /* fixa à direita */
    }
`;

export default BlockCards;