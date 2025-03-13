import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styles/Produtos.style'
import ProdutCard from '../components/ProductCard';

const Produtos = () => {
    const { nome } = useParams();
    const [results, setResults] = React.useState([]);
    // Estado para ordenação e quantidade por página
    const [orderBy, setOrderBy] = React.useState("mais-avaliados");
    const [itemsPerPage, setItemsPerPage] = React.useState(20);

    useEffect(() => {
        fetch(`https://v10k527pp4.execute-api.us-east-1.amazonaws.com/stickers?tipo=${nome}`)
            .then((response) => response.json())
            .then((data) => setResults(data));
    }, [nome]);

    let items = results?.items || [];
    let sortedItems = [...items];
    if (orderBy === 'menor-preco') {
        sortedItems.sort((a, b) => a.price - b.price);
    } else if (orderBy === 'maior-preco') {
        sortedItems.sort((a, b) => b.price - a.price);
    } else if (orderBy === 'mais-avaliados') {
        sortedItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    // Paginação: limita os itens exibidos
    let paginatedItems = sortedItems.slice(0, itemsPerPage);
    let count = results?.count;

    return (
        <S.PageContainerMain>
            <S.PageContainer>
                <S.ResultHeader>
                    <h1>Resultados para "{nome}"</h1>
                    <S.FilterSection>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <S.FilterGroup>
                                <label>Ordenar:</label>
                                <select
                                    defaultValue="mais-avaliados"
                                    onChange={(e) => setOrderBy(e.target.value)}
                                >
                                    <option value="mais-avaliados">Mais avaliados</option>
                                    <option value="menor-preco">Menor preço</option>
                                    <option value="maior-preco">Maior preço</option>
                                </select>
                            </S.FilterGroup>
                            <S.FilterGroup>
                                <label>Exibir:</label>
                                <select
                                    defaultValue="20"
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                >
                                    <option value="20">20 por página</option>
                                    <option value="40">40 por página</option>
                                    <option value="60">60 por página</option>
                                </select>
                            </S.FilterGroup>
                        </div>
                        <S.ResultCount>{count} Produtos</S.ResultCount>
                    </S.FilterSection>
                </S.ResultHeader>

                <S.ProductGrid>
                    {paginatedItems?.map((item) => (
                        <ProdutCard key={item.sticker_id} data={item} />
                    ))}
                </S.ProductGrid>
            </S.PageContainer>     
        </S.PageContainerMain>
    );
};

export default Produtos;