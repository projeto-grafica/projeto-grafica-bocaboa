import styled from "styled-components";
import { ButtonDefault, ButtonFull } from "./styles/Botoes.style";

const Botao = ({ Text, Type, onClick, Icon, weight }) => {
    switch (Type) {
        case "cheio":
            return (
                <ButtonFull>
                    <button onClick={onClick} style={{fontWeight: weight}}>
                        {Icon}
                        {Text}
                    </button>
                </ButtonFull>
            );
        default:
            return (
                <ButtonDefault>
                    <button onClick={onClick} style={{fontWeight: weight}}>
                        {Icon}
                        {Text}
                    </button>
                </ButtonDefault>
            );
    }
}

export default Botao;