import styled from "styled-components";
import { ButtonDefault, ButtonFull } from "./styles/Botoes.style";

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

export default Botao;