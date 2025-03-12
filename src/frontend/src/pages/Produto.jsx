import { useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import ProdutCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { OtherContext } from "../context/OtherContext";
import Botao from "../components/Botoes";
import { 
    Container,
    Breadcrumb,
    ProductContainer,
    ProductImage,
    ProductDetails,
    ProductTitle,
    ProductDescription,
    ProductFeatures,
    PriceContainer,
    TotalPrice,
    Actions,
    TemplatesSection,
    SectionTitle,
    TemplateOptions,
    DetailsSection,
    SimilarProducts,
} from "./styles/Produto.style"

const Produto = () => {
    const { nome } = useParams();
    const navigate = useNavigate();
    const { productId } = useContext(OtherContext);
    const [activeOption, setActiveOption] = useState('tamanho');  
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    let name = product?.name;
    let formattedName = name ? (name.charAt(0).toUpperCase() + name.slice(1)) : "";
    let price = product?.price;
    let type = product?.tipo;
    let formattedType = type ? (type.charAt(0).toUpperCase() + type.slice(1)) : "";
    let description = product?.description;

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

    useEffect(() => {
        fetch(`https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers?tipo=${type}`)
            .then(response => response.json())
            .then(data => setRelatedProducts(data.items))
    }, [type]);

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
                                <Botao Text={'Adicionar ao carrinho'} Type={'vazado'} onClick={handleGoToCart} Icon={<IoCartOutline size={20}/>}/>
                                <Botao Text={'Comprar agora'} Type={'cheio'} onClick={handleGoToCart}/>
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
                    {relatedProducts?.map((product) => (
                        <ProdutCard key={product.id} data={product} />
                    ))}
                </div>
            </SimilarProducts>
        </Container>
    );
};

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