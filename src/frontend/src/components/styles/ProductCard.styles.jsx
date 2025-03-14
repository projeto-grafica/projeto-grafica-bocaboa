import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 12.5rem;
    height: 300px;
    padding: 1rem;
    border-radius: 10px;
    justify-content: start;
    gap: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .img {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 180px;
        border-radius: 8px;
        overflow: hidden;
        background-image: url("https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png");
        background-size: cover;
        background-position: center;
    }

    .promotionTag {
        position: relative;
        top: 0.5rem;
        right: -50%;
        transform: translateX(-50%);
        background: #62A860;
        font-size: 0.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3rem 1rem;
        border-radius: 6px;
    }

    .promotionText {
        font-size: 0.625rem;
        margin: 0;
        padding: 0;
        color: white;
        font-weight: 500;
    }
    
    .rate {
        display: flex;
        justify-content: start;
        gap: 5px;
        align-items: center;

        .starQuantity {
            margin: 0;
            font-size: 0.75rem;
            font-weight: 500;
            color: #2E2E30;
        }
        
        .rateQuantity {
            margin: 0;
            font-size: 0.75rem;
            font-weight: 400;
            color: #666;
        }        
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.5rem;

        p {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            color: #2E2E30;
        }

        .priceText {
            margin-top: 0.5rem;
            margin-bottom: 0.2rem;
            font-size: 0.625rem;
            color: #9e9e9e;
            font-weight: 400;
        }

        .price {
            font-size: 0.688rem;
            font-weight: 300;
            color: #9e9e9e;

            b {
                font-size: 1rem;
                color: #62A860;
                font-weight: 700;
            }
        }
    }

    /* Responsividade para diferentes tamanhos de tela */
    @media (max-width: 1200px) {
        max-width: 280px;
        
        .img {
            height: 250px;
        }
    }

    @media (max-width: 768px) {
        max-width: 220px;
        
        .img {
            height: 200px;
        }
        
        p {
            font-size: 0.875rem;
        }
    }

    @media (max-width: 480px) {
        max-width: 100%;
        
        .img {
            height: 180px;
        }
    }
`;