import { Link, Links } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";
import { Nav, Promotion, PromotionHighlight, NavBar, Line, LinksBar, ContainerIcons } from "./styles/NavBar.styles.jsx";

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

export default Navbar;
