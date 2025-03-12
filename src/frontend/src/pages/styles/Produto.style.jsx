import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem 7.5vw;
    background-color: #f5f5f5;
`;

export const Breadcrumb = styled.div`
    font-size: 12px;
    color: #666;
    margin-bottom: 1rem;

    a {
        color: #666;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const ProductContainer = styled.div`
    display: flex;
    gap: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .photos {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .subPhotos {
        display: flex;
        gap: 1rem;
        
        img {
            width: 80px;
            height: 80px;
            border-radius: 8px;
            object-fit: cover;
        }
    }
`;

export const ProductImage = styled.img`
    height: 60vh;
    border-radius: 8px;
    object-fit: cover;
`;

export const ProductDetails = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0;

        .rate {
        display: flex;
        justify-content: start;
        gap: 2px; /* Ajuste no espaçamento entre as estrelas e o texto */
        align-items: center;
        margin-top: 1vh; /* Espaçamento acima do rating */

        .starQuantity {
            margin: 0;
            font-size: 12px; /* Aumentei o tamanho da fonte */
            font-weight: 500; /* Fonte um pouco mais forte */
            color: #2E2E30;
        }
        
        .rateQuantity {
            margin: 0;
            font-size: 12px; /* Aumentei o tamanho da fonte */
            font-weight: 400; /* Fonte normal */
            color: #666; /* Cor mais suave */
        }        
    }
`;

export const ProductTitle = styled.h1`
    font-size: 24px;
    color: #2E2E30;
    margin: 0;
`;

export const ProductDescription = styled.p`
    font-size: 14px;
    color: #2e2e30aa;
    margin: 0;
    margin-top: 3vh;
    margin-bottom: 3vh;
`;

export const ProductFeatures = styled.div`
    display: flex;
    height: 60vh;
    background-color: #b9b9b95a;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 4vh;
    gap: 2vh;


    .priceSpace {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;

        h1 {
            font-size: 20px;
            font-weight: 500;
            margin: 0;
        }
    }
`;

export const TotalPrice = styled.div`
    font-size: 20px;
    color: #2E2E30;
    font-weight: 500;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;

    p {
        font-size: 14px;
        color: #2E2E30;
        margin: 0;
        text-decoration: underline;
        cursor: pointer;
    }

    .buttons {
        display: flex;  
        gap: 1rem;
    }
`;

export const TemplatesSection = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 500;
    color: #2E2E30;
    margin: 0 0 2rem 0;
`;

export const TemplateOptions = styled.div`
    display: flex;
    justify-content: center;
    gap: 3vw;
    margin-bottom: 2vh;

    button {
        width: 20vw;
        height: 8vh;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #f5f5f5;
        }
    }
`;

export const DetailsSection = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .options {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;

        button {
            width: 10vw;
            height: 5vh;
            border: 1px solid ${props => props.$active ? '#F27E16' : '#666'};
            border-radius: 20px;
            background: ${props => props.$active ? '#F27E16' : 'transparent'};
            color: ${props => props.$active ? 'white' : '#666'};
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                border-color: #F27E16;
                background: ${props => props.$active ? '#F27E16' : 'rgba(242, 126, 22, 0.1)'};
                color: ${props => props.$active ? 'white' : '#F27E16'};
            }
        }
    }

    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .info-column {
            width: 70%;

            h3 {
                font-size: 16px;
                color: #2E2E30;
                margin: 0 0 1rem 0;
            }
        }

        .description {
            width: 70%;
            
            p {
                font-size: 14px;
                color: #666;
                line-height: 1.5;
                margin: 0;
            }
        }
    }
`;



export const SimilarProducts = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }
`;
