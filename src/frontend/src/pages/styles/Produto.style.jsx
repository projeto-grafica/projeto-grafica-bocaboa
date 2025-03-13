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
    padding: 2rem 1rem;
    background-color: #f5f5f5;
    
    @media (min-width: 768px) {
        padding: 2rem;
    }
    
    @media (min-width: 1200px) {
        padding: 2rem calc(5% + 1rem);
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
`;

export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    @media (min-width: 992px) {
        flex-direction: row;
        padding: 2rem;
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
    
    @media (min-width: 768px) {
        margin: 2rem 0;
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
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }

    p {
        font-size: 0.875rem;
        color: #2E2E30;
        margin: 0;
        text-decoration: underline;
        cursor: pointer;
        order: 2;
        
        @media (min-width: 768px) {
            order: 1;
        }
    }

    .buttons {
        display: flex;  
        gap: 1rem;
        width: 100%;
        justify-content: center;
        order: 1;
        
        @media (min-width: 768px) {
            width: auto;
            order: 2;
        }
    }
`;

export const TemplatesSection = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    @media (min-width: 768px) {
        padding: 2rem;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 500;
    color: #2E2E30;
    margin: 0 0 1.5rem 0;
    
    @media (min-width: 768px) {
        font-size: 1.5rem;
        margin: 0 0 2rem 0;
    }
`;

export const TemplateOptions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    @media (min-width: 768px) {
        flex-direction: row;
        gap: 2rem;
    }

    button {
        width: 100%;
        height: 3rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: white;
        cursor: pointer;
        transition: background-color 0.3s;
        
        @media (min-width: 768px) {
            width: 24%;
            height: 3.5rem;
        }

        @media (min-width: 992px) {
            width: 20%;
        }

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
    
    @media (min-width: 768px) {
        padding: 2rem;
    }

    .options {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        
        @media (min-width: 768px) {
            flex-wrap: nowrap;
            margin-bottom: 2rem;
        }

        button {
            flex: 1;
            min-width: 120px;
            height: 2.5rem;
            border: 1px solid ${props => props.$active ? '#F27E16' : '#666'};
            border-radius: 20px;
            background: ${props => props.$active ? '#F27E16' : 'transparent'};
            color: ${props => props.$active ? 'white' : '#666'};
            cursor: pointer;
            transition: all 0.3s;
            
            @media (min-width: 768px) {
                flex: 0 1 auto;
                width: auto;
                padding: 0 1.5rem;
            }

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
            width: 100%;
            
            @media (min-width: 768px) {
                width: 80%;
            }
            
            @media (min-width: 992px) {
                width: 70%;
            }

            h3 {
                font-size: 1rem;
                color: #2E2E30;
                margin: 0 0 1rem 0;
            }
        }

        .description {
            width: 100%;
            
            @media (min-width: 768px) {
                width: 80%;
            }
            
            @media (min-width: 992px) {
                width: 70%;
            }
            
            p {
                font-size: 0.875rem;
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
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    @media (min-width: 768px) {
        padding: 2rem;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
        
        @media (min-width: 576px) {
            grid-template-columns: repeat(2, 1fr);
        }
        
        @media (min-width: 992px) {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        
        @media (min-width: 1200px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
`;