import { useState } from 'react';
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProdutCard from "./ProductCard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 85vw;
    margin-top: 5vh;
    position: relative;

    p {
        font-size: 22px;
        font-weight: 700;
        color: #2E2E30;
        margin: 0;
        margin-bottom: 20px;
    }

    .carousel-container {
        width: 100%;
        position: relative;
        overflow: hidden;
        padding: 0; /* Espaço para as setas */
    }

    .cards {
        display: flex;
        transition: transform 0.5s ease-in-out;
        gap: 1vw;
        width: calc(100% + 2vw);
    }

    .arrow {
        position: absolute;
        top: 55%;
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
        left: -50px;
    }

    .arrow-right {
        right: -50px;
    }
`;

const BlockCards = ({ title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const products = Array(10).fill(null);
    const itemsPerPage = 4;
    const totalItems = products.length;

    const cardWidth = (100 / itemsPerPage) - (1  * (itemsPerPage - 1) / itemsPerPage);

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, totalItems - itemsPerPage));
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
                <div
                    className="cards"
                    style={{
                        transform: `translateX(-${currentIndex * (cardWidth + 1)}%)`,
                    }}
                >
                    {products.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                flex: `0 0 ${cardWidth}%`,
                                maxWidth: `${cardWidth}%`
                            }}
                        >
                            <ProdutCard />
                        </div>
                    ))}
                </div>


            </div>
            {currentIndex < totalItems - itemsPerPage && (
                <button className="arrow arrow-right" onClick={handleNext}>
                    <IoIosArrowForward size={24} color="#2E2E30" />
                </button>
            )}
        </Container>
    );
}

export default BlockCards;