import { Link, Links } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
`

const Promotion = styled.div`
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #62A860, #F27E16);
    width: 100vw;
    padding: 5px 0;

    p {
        margin: 0;
        font-size: 14px;
        color: #2E2E30;
        font-weight: 500;
    }
`

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
`

const Line = styled.div`
    width: 100vw;
    height: 0.7vh;
    background-color: #F27E16;    
`

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
            font-weight: 400;
            text-decoration: none;
        }
    }
`

const ContainerIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12vw;
`

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation(); 
    const showElements = ["/"].includes(location.pathname);
    const [searchWords, setSearchWords] = useState("");

    return (
        <Nav>
            {showElements && (
                <Promotion>
                    <p>Transforme suas ideias em realidade! Garanta 30% de desconto com o código CRIE30. Válido até 21/05!</p>
                </Promotion>
            )}      

            <NavBar>
                <div className="container">
                    <Link to={'/'}>Share Print</Link>
                    <SearchBar search={searchWords} setSearchWords={setSearchWords}/>
                    <ContainerIcons>
                        <Link to={'perfil/favoritos'}>
                            <IoHeartOutline size={24} color="white" />
                        </Link>
                        <Link to={'/carrinho'}>
                            <IoCartOutline size={24} color="white" />
                        </Link>
                        {user ? (
                            <IoPersonOutline size={24} color="white" onClick={logout} />
                        ) : (
                            <Link to="/perfil">
                                <IoPersonOutline size={24} color="white" />
                            </Link>
                        )}
                    </ContainerIcons>
                </div>

            </NavBar>

            <Line></Line>

            {showElements && (
                <LinksBar>
                    <div className="container">
                        <Link to="produtos/panfletos">Panfletos</Link>
                        <Link to="produtos/etiquetas">Etiquetas</Link>
                        <Link to="produtos/envelopes">Envelopes</Link>
                        <Link to="produtos/adesivos">Adesivos</Link>
                        <Link to="produtos/cartoes">Cartões</Link>
                    </div>
                </LinksBar>
            )}   
        </Nav>
    );
};

export default Navbar;
