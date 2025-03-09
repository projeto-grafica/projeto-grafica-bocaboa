import { Link, Links } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";

// Componente de barra de navegação
const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const showElements = ["/"].includes(location.pathname);
    const [searchWords, setSearchWords] = useState("");

    return (
        <Nav>
            {showElements && (
                <Promotion>
                    <p>Transforme suas ideias em realidade! Garanta 30% de desconto com o código <PromotionHighlight>CRIE30</PromotionHighlight>. Válido até 21/05!</p>
                </Promotion>
            )}

            <NavBar>
                <div className="container">
                    <Link to={'/'}>Share Print</Link>
                    <SearchBar search={searchWords} setSearchWords={setSearchWords} />
                    <ContainerIcons>
                        <Link className="icons" to={'perfil/favoritos'}>
                            <IoHeartOutline size={24} />
                        </Link>
                        <Link className="icons" to={'/carrinho'}>
                            <IoCartOutline size={24} />
                        </Link>
                        <Link className="icons" to="/perfil">
                            <IoPersonOutline size={24} />
                        </Link>
                    </ContainerIcons>
                </div>

            </NavBar>

            <Line></Line>

            {showElements && (
                <LinksBar>
                    <div className="container">
                        <Link to="produtos/panfleto">Panfletos</Link>
                        <Link to="produtos/etiqueta">Etiquetas</Link>
                        <Link to="produtos/envelope">Envelopes</Link>
                        <Link to="produtos/adesivo">Adesivos</Link>
                        <Link to="produtos/cartão">Cartões</Link>
                    </div>
                </LinksBar>
            )}
        </Nav>
    );
}

// Estilização dos componentes da barra de navegação
const Nav = styled.nav`
    display: flex;
    flex-direction: column;
`;

const Promotion = styled.div`
    pointer-events: none;
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #62A860, #F27E16);
    background-size: 200% auto;
    width: 100vw;
    padding: 6px 0;

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
                      rgba(255, 255, 255, 0) 0%, 
                      rgba(255, 255, 255, 0.2) 50%,
                      rgba(255, 255, 255, 0) 100%);
        animation: shine 2.5s infinite;
    }

    p {
        margin: 0;
        font-size: 15px;
        color: #2E2E30;
        font-weight: 600;
        letter-spacing: 0.3px;
        text-align: center;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.015); }
        100% { transform: scale(1); }
    }
    
    @keyframes shine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;

const PromotionHighlight = styled.span`
    background-color: purple;
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    font-weight: 700;
    display: inline-block;
    transform: rotate(-2deg);
    animation: attention 3s ease-in-out infinite alternate;
    
    @keyframes attention {
        0% { transform: rotate(-1deg) scale(1); }
        100% { transform: rotate(1deg) scale(1.1); }
    }
`;

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2E2E30;
    width: 100vw;
    height: 12vh;
    padding: 0 7.5vw;

    a {
        font-size: 32px;
        color: white;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
    }

    .container{
        display: flex;
        justify-content: space-between;
        width: 85vw;
    }
`;

const Line = styled.div`
    width: 100vw;
    height: 0.7vh;
    background-color: #F27E16;    
`;

const LinksBar = styled.nav`
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100vw;
    gap: 5vw;

    .container {
        display: flex;
        justify-content: start;
        width: 85vw;
        padding: 15px 0;
        gap: 5vw;

        a {
            font-size: 14px;
            color: #2E2E30;
            transition: color 0.3s;
            font-weight: 400;
            text-decoration: none;
            &:hover {
                color: #F27E16;
            }
        }
    }
`;

const ContainerIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12vw;

    .icons {
        color: white;
        transition: color 0.3s;
    }
    
    .icons:hover {
        color: orange;
    }
`;

export default Navbar;
