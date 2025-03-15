import styled from "styled-components";

export const ContainerMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    align-items: center;
`

export const Container = styled.div`
    max-width: 1080px;
    width: 100%;
    padding: 2rem 1rem;
    background-color: #f5f5f5;
    
    @media (max-aspect-ratio: 4/3) {
        padding: 2rem 0;
        width: 90%;
    }
`;

export const Breadcrumb = styled.div`
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 1rem;

    a {
        color: #666;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    @media (max-aspect-ratio: 4/3) {
        font-size: 0.8rem;
    }
`;

export const ProductContainer = styled.div`
    display: flex;
    gap: 2rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    @media (max-aspect-ratio: 4/3) {
        flex-direction: column;
        padding: 1rem;
    }

    .photos {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        
        @media (min-width: 992px) {
            width: 40%;
        }
    }

    .subPhotos {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        
        img {
            width: 70px;
            height: 70px;
            border-radius: 8px;
            object-fit: cover;
            flex-shrink: 0;
            
            @media (min-width: 768px) {
                width: 80px;
                height: 80px;
            }
        }
    }

    @media (max-aspect-ratio: 4/3) {
        .title{
            display: flex;
            flex-direction: column;
            gap: 0;

            .rate {
                display: flex;
                gap: 2px;
                align-items: center;
                margin-top: 0.5rem;

                .starQuantity {
                    margin: 0;
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: #2E2E30;
                }
                
                .rateQuantity {
                    margin: 0;
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: #666;
                }        
            }
        }   

        .photos {
            .subPhotos {
                img {
                    width: 4.3rem;
                    height: 4.3rem;
                }
            }
        }
    }
`;

export const ProductImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 400px;
    border-radius: 8px;
    object-fit: cover;
    
    @media (min-width: 992px) {
        max-height: 500px;
    }
`;

export const ProductDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    
    @media (min-width: 992px) {
        width: 60%;
    }

    .rate {
        display: flex;
        justify-content: start;
        gap: 2px;
        align-items: center;
        margin-top: 0.5rem;

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
`;

export const ProductTitle = styled.h1`
    font-size: 1.5rem;
    color: #2E2E30;
    margin: 0;
    
    @media (min-width: 768px) {
        font-size: 1.75rem;
    }
`;

export const ProductDescription = styled.p`
    font-size: 0.875rem;
    color: #2e2e30aa;
    margin: 1.5rem 0;
    
    @media (max-aspect-ratio: 4/3) {
        margin: 1rem 0;
    }
`;

export const ProductFeatures = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #b9b9b95a;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 200px;
    
    @media (min-width: 768px) {
        min-height: 300px;
    }
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    gap: 1rem;

    .priceSpace {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;

        h1 {
            font-size: 1.25rem;
            font-weight: 500;
            margin: 0;
            
            @media (min-width: 768px) {
                font-size: 1.5rem;
            }
        }
    }
`;

export const TotalPrice = styled.div`
    font-size: 1.25rem;
    color: #2E2E30;
    font-weight: 500;
    
    @media (min-width: 768px) {
        font-size: 1.5rem;
    }
`;

export const Actions = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    /* inverter os itens */ 
    flex-direction: row-reverse;
    
    @media (max-aspect-ratio: 4/3) {
        flex-direction: column;
        justify-content: start;
        gap: 1rem;
    }

    p {
        font-size: 0.875rem;
        color: #2E2E30;
        margin: 0;
        text-decoration: underline;
        cursor: pointer;
        order: 2;
    }

    .buttons {
        display: flex;  
        gap: 1rem;
        justify-content: center;
        order: 1;

        button {
            max-width: 200px;
        }
        
        @media (max-aspect-ratio: 4/3) {
            width: 100%;
            gap: 1rem;
            justify-content: center;        

            button {
                width: 150px;
            }
        }
    }
`;

export const TemplatesSection = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 500;
    color: #2E2E30;
    margin: 0 0 1.5rem 0;
`;

export const TemplateOptions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    width: 100%;
    
    button {
        max-width: 300px;
        width: 100%;
        height: 3rem;
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
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    .options {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        button {
            min-width: 120px;
            height: 2.5rem;
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

        @media (max-aspect-ratio: 4/3) {
            width: 100%;
            gap: 0.5rem;
            display: flex;
            flex-wrap: wrap;

            button {
                padding: 0;
                max-width: 60px;
                width: 60px;
                height: 2rem;

            }
        }
    }

    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .info-column {
            width: 65%;
            
            h3 {
                font-size: 1rem;
                color: #2E2E30;
                margin: 0 0 1rem 0;
            }
        }

        .description {
            width: 65%;

            p {
                font-size: 0.875rem;
                color: #666;
                line-height: 1.5;
                margin: 0;
            }
        }

        @media (max-aspect-ratio: 4/3) {
            .info-column {
                width: 100%;
            }

            .description {
                width: 100%;
            }
        }
    }
`;

export const SimilarProducts = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    .cards {
        display: flex;
        gap: 1.5rem;
    }

    @media (max-aspect-ratio: 4/3) {
        .slick-track {
            display: flex;
            gap: 1rem;
        }

        .slick-slide {
            width: 80% !important;
        }

        .cards {
            display: block;
        }
    }
`;