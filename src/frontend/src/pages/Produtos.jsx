import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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
        <PageContainer>
            <ResultHeader>
                <h1>Resultados para "{nome}"</h1>
                <FilterSection>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <FilterGroup>
                            <label>Ordenar:</label>
                            <select
                                defaultValue="mais-avaliados"
                                onChange={(e) => setOrderBy(e.target.value)}
                            >
                                <option value="mais-avaliados">Mais avaliados</option>
                                <option value="menor-preco">Menor preço</option>
                                <option value="maior-preco">Maior preço</option>
                            </select>
                        </FilterGroup>
                        <FilterGroup>
                            <label>Exibir:</label>
                            <select
                                defaultValue="20"
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value="20">20 por página</option>
                                <option value="40">40 por página</option>
                                <option value="60">60 por página</option>
                            </select>
                        </FilterGroup>
                    </div>
                    <ResultCount>{count} Produtos</ResultCount>
                </FilterSection>
            </ResultHeader>

            <ProductGrid>
                {paginatedItems?.map((item) => (
                    <ProdutCard key={item.sticker_id} data={item} />
                ))}
            </ProductGrid>
        </PageContainer>
    );
};

// estilos
const PageContainer = styled.div`
  padding: 5vh 7.5vw;
  background-color: #f9f9f9;
`;

const ResultHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.2rem;
    color: #2E2E30;
    margin-bottom: 1rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    color: #666;
    font-size: 14px;
  }

  select {
    padding: 2px 5px;
    border: 1px solid #ddd;
    border-radius: 14px;
    background-color: white;
    color: #2E2E30;
    font-size: 14px;
    width: 200px;
  }
`;

const ResultCount = styled.span`
  color: #666;
  font-size: 14px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4.32vw;
  margin-top: 1rem;
  justify-content: space-between;
`;

export default Produtos;