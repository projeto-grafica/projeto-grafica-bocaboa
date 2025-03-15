import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-top: 5vh;
    position: relative;
    padding: 0 7.5vw;
    box-sizing: border-box;

    p {
        font-size: 22px;
        font-weight: 700;
        color: #2E2E30;
        margin: 0;
        margin-bottom: 15px;
    }

    .slider-container {
        width: 100%;
        position: relative;
        
        .slick-slider {
            width: 100%;
        }

        .slick-track {
            display: flex;
            gap: 1.5rem;
        }

        .card-wrapper {
            padding: 0.5rem;
        }

        .slick-arrow {
            position: absolute;
            top: 60%;
            z-index: 1;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            scale: 2;
            
            &:hover {
                top: 48%;
                transform: scale(1.05);
            }

            &:before {
                color: #2E2E30;
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .slick-prev {
            left: -20px;
        }

        .slick-next {
            right: -20px;
        }

        @media (max-width: 768px) {
            .slick-arrow {
                display: none !important;
            }
            
            .slick-track {
                gap: 0.5rem;
            }
            
            .card-wrapper {
                padding: 0 0.25rem;
            }
        }
    }
`;
