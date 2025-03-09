import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IoCartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import ProdutCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { OtherContext } from "../context/OtherContext";

const Produto = () => {
    const { nome } = useParams();
    const navigate = useNavigate();
    const { productId } = useContext(OtherContext);
    const [activeOption, setActiveOption] = useState('tamanho');  
    const [product, setProduct] = useState({});
    let name = product?.name;
    let formattedName = name ? (name.charAt(0).toUpperCase() + name.slice(1)) : "";
    let price = product?.price;
    let type = product?.tipo;
    let formattedType = type ? (type.charAt(0).toUpperCase() + type.slice(1)) : "";
    let description = product?.description;

    console.log(product);

    const handleGoToCart = () => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        const value = Array.isArray(productId) ? productId[0] : productId;
        cartProducts.push(value);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        navigate('/carrinho');  
    }

    useEffect(() => {
        fetch(`https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [productId]);

    return (
        <Container>
            <Breadcrumb>
                <a href="/">Início</a> &gt; <a href={"/produtos/" + type}>{formattedType}</a> &gt; {formattedName}
            </Breadcrumb>

            <ProductContainer>
                <div className="photos">
                    <ProductImage src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png" alt={nome} />
                    <div className="subPhotos">
                        <img src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png" alt="Foto do produto" />
                        <img src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png" alt="Foto do produto" />
                        <img src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png" alt="Foto do produto" />
                        <img src="https://d1br4h274rc9sc.cloudfront.net/content/shortcut_adesivos_cfc551fd54.png" alt="Foto do produto" />
                    </div>
                </div>
                <ProductDetails>
                    <ProductTitle>{formattedName}</ProductTitle>
                    <div className="rate">
                        <IoStar size={14} color="#F27E16" />
                        <IoStar size={14} color="#F27E16" />
                        <IoStar size={14} color="#F27E16" />
                        <IoStar size={14} color="#F27E16" />
                        <IoStar size={14} color="#F27E16" />
                        <p className="starQuantity">5</p>
                        <p className="rateQuantity">(4.200)</p>
                    </div>
                    <ProductDescription>
                        {description}
                    </ProductDescription>

                    <ProductFeatures>
                    </ProductFeatures>

                    <PriceContainer>
                        <div className="priceSpace">
                            <h1>Total:</h1>
                            <TotalPrice>R$ {price}</TotalPrice>
                        </div>
                        <Actions>
                            <p>Calcular Frete</p>
                            <div className="buttons">
                                <button onClick={handleGoToCart}><IoCartOutline size={20} /> Adicionar ao carrinho</button>
                                <button onClick={handleGoToCart}>Comprar Agora</button>
                            </div>
                        </Actions>
                    </PriceContainer>
                </ProductDetails>
            </ProductContainer>

            <TemplatesSection>
                <SectionTitle>Gabaritos</SectionTitle>
                <TemplateOptions>
                    <button>PDF</button>
                    <button>Imagem</button>
                    <button>Outro Formato</button>
                </TemplateOptions>
            </TemplatesSection>

            <DetailsSection>
                <SectionTitle>Detalhes das opções</SectionTitle>
                <div className="options">
                    {Object.keys(detailContents).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveOption(key)}
                            active={activeOption === key}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="content">
                    <div className="info-column">
                        <h3>{detailContents[activeOption].title}</h3>
                    </div>
                    <div className="description">
                        <p>{detailContents[activeOption].description}</p>
                    </div>
                </div>
            </DetailsSection>

            <SimilarProducts>
                <SectionTitle>Produtos similares</SectionTitle>
                <div className="cards">
                    <ProdutCard />
                    <ProdutCard />
                    <ProdutCard />
                    <ProdutCard />
                </div>
            </SimilarProducts>
        </Container>
    );
};

const Container = styled.div`
    padding: 2rem 7.5vw;
    background-color: #f5f5f5;
`;

const Breadcrumb = styled.div`
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

const ProductContainer = styled.div`
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

const ProductImage = styled.img`
    height: 60vh;
    border-radius: 8px;
    object-fit: cover;
`;

const ProductDetails = styled.div`
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

const ProductTitle = styled.h1`
    font-size: 24px;
    color: #2E2E30;
    margin: 0;
`;

const ProductDescription = styled.p`
    font-size: 14px;
    color: #2e2e30aa;
    margin: 0;
    margin-top: 3vh;
    margin-bottom: 3vh;
`;

const ProductFeatures = styled.div`
    display: flex;
    height: 60vh;
    background-color: #b9b9b95a;
`;

const PriceContainer = styled.div`
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

const TotalPrice = styled.div`
    font-size: 20px;
    color: #2E2E30;
    font-weight: 500;
`;

const Actions = styled.div`
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

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5vw;
        width: 15vw;
        height: 6vh;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:first-child {
            background-color: transparent;
            color: #4e8c4c;
            border: 1.5px solid #4e8c4c;

            &:hover {
                background-color: #4e8c4c;
                color: white;
            }
        }

        &:last-child {
            background-color: #4e8c4c;
            color: white;

            &:hover {
                background-color: #5ea95c;
            }
        }
    }
`;

const TemplatesSection = styled.div`
    margin-top: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 500;
    color: #2E2E30;
    margin: 0 0 2rem 0;
`;

const TemplateOptions = styled.div`
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

const DetailsSection = styled.div`
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



const SimilarProducts = styled.div`
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


const detailContents = {
    tamanho: {
        title: "4x2 cm",
        description: "Tamanho padrão para etiquetas redondas. Ideal para identificação de produtos pequenos e médios. Disponível em diferentes diâmetros conforme necessidade."
    },
    cores: {
        title: "Cores Vibrantes",
        description: "Impressão em cores CMYK de alta qualidade. Garantia de fidelidade de cores e resistência à luz. Opção de cores especiais Pantone disponível."
    },
    substrato: {
        title: "Material Premium",
        description: "Vinil autoadesivo de alta qualidade com proteção UV. Resistente à água, óleos e temperaturas extremas. Disponível em acabamento brilhante ou fosco."
    },
    corte: {
        title: "Corte Perfeito",
        description: "Corte preciso a laser garantindo bordas lisas e uniformes. Formato redondo perfeito sem deformações. Opção de corte especial sob encomenda."
    },
    quantidade: {
        title: "Quantidade Flexível",
        description: "Encomendas a partir de 100 unidades. Descontos progressivos para grandes quantidades. Entrega rápida para pedidos acima de 1000 unidades."
    }
};

export default Produto;