import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 16vw;
    height: auto;
    padding: 1vw;
    border-radius: 10px;
    justify-content: start;
    gap: 1.5vh;
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
        width: 16vw;
        height: 35vh;
        border-radius: 8px;
        overflow: hidden;
        background-image: url("https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png");
        background-size: cover;
        background-position: center;
    }

    .promotionTag {
        position: relative;
        top: 0.5vw;
        right: -5.2vw;
        background: #62A860;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3vw 1.4vw;
        border-radius: 6px;
    }

    .promotionText {
        font-size: 10px;
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
        margin-top: 1vh;

        .starQuantity {
            margin: 0;
            font-size: 12px;
            font-weight: 500;
            color: #2E2E30;
        }
        
        .rateQuantity {
            margin: 0;
            font-size: 12px;
            font-weight: 400;
            color: #666;
        }        
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.7vh;

        p {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
            color: #2E2E30;
        }

        .priceText {
            margin-top: 0.5vh;
            margin-bottom: 0.2vh;
            font-size: 10px;
            color: #9e9e9e;
            font-weight: 400;
        }

        .price {
            font-size: 11px;
            font-weight: 300;
            color: #9e9e9e;

            b {
                font-size: 16px;
                color: #62A860;
                font-weight: 700;
            }
        }
    }
`;
