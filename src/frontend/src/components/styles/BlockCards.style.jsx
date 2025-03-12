import styled from "styled-components";

export const Container = styled.div`
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
