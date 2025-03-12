import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SearchContainer, StyledInput, SearchButton } from "./styles/SearchBarStyles";

// Componente de barra de pesquisa
const SearchBar = ({ search, setSearchWords }) => {
    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/pesquisa?q=${encodeURIComponent(search)}`);
        }
    };

    return (
        <SearchContainer onSubmit={handleSearch}>
            <StyledInput
                type="text"
                value={search}
                onChange={(e) => setSearchWords(e.target.value)}
                placeholder="O que você quer imprimir hoje?"
            />
            <SearchButton type="submit" aria-label="Buscar">
                <IoSearch size={18} color="#666" />
            </SearchButton>
        </SearchContainer>
    );
}

export default SearchBar;