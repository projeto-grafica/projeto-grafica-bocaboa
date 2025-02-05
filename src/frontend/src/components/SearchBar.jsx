import styled from "styled-components";

const Input = styled.input`
    width: 55%;
    height: 6vh;
    border-radius: 10px;
    padding: 0 10px;
    border: none;
`

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

export default SearchBar;