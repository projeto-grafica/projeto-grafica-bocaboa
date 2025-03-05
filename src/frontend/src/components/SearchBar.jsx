import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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

const SearchContainer = styled.form`
    position: relative;
    width: 55%;
    display: flex;
    align-items: center;
`;

// Estilização do input da barra de pesquisa
const StyledInput = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 50px;
    padding: 0 45px 0 20px;
    border: 2px solid transparent;
    background-color: #f5f5f5;
    color: #2E2E30;
    font-size: 14px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    &::placeholder {
        color: #aaa;
        font-style: italic;
    }
    
    &:focus {
        outline: none;
        border-color: #F27E16;
        box-shadow: 0 3px 8px rgba(242, 126, 22, 0.15);
        background-color: white;
    }
    
    &:hover {
        background-color: #efefef;
    }
`;

const SearchButton = styled.button`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: rgba(242, 126, 22, 0.1);
        
        svg {
            color: #F27E16 !important;
        }
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(242, 126, 22, 0.3);
    }
`;

export default SearchBar;