import styled from "styled-components";

const Botao = ({ Text, Type, onClick, Icon }) => {

    switch (Type) {
        case "cheio":
            return (
                <ButtonFull>
                    <button onClick={onClick}>{Text}</button>
                </ButtonFull>
            );
            break;

        default:
            return (
                <ButtonDefault>
                    <button onClick={onClick}>
                        {Icon}
                        {Text}
                    </button>
                </ButtonDefault>
            );
    }
}

const ButtonDefault = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    button{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #4e8c4c;
    border: 1.5px solid #4e8c4c;
    gap: 0.5vw;
    width: 15vw;
    height: 6vh;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
        &:hover {
            background-color: #4e8c4c;
            color: white;
        }
    }
`;

const ButtonFull = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
    border-radius: 8px;

    button {
        gap: 0.5vw;
        width: 15vw;
        height: 6vh;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
        background-color: #4e8c4c;
        color: white;
        border: none;

        &:hover {
        background-color: #5ea95c;
    }
}
`;

export default Botao;