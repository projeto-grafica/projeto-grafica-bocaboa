import styled from "styled-components";

// Componente de barra de pesquisa
const SearchBar = ({ search, setSearchWords }) => {
    return (
        <Input
            type="text"
            value={search}
            onChange={(e) => setSearchWords(e.target.value)}
            placeholder="O que você quer imprimir hoje?"
        />
    );
}

// Estilização do input da barra de pesquisa
const Input = styled.input`
    width: 55%;
    height: 6vh;
    border-radius: 10px;
    padding: 0 10px;
    border: none;
`;

export default SearchBar;