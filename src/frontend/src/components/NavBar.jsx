import { Link } from "react-router-dom";
    import { useLocation } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import SearchBar from "./SearchBar.jsx";
import { useState, useEffect } from "react";
import { 
    Nav, 
    Promotion, 
    PromotionHighlight, 
    NavBar, 
    Line, 
    LinksBar, 
    ContainerIcons,
    MobileMenuButton,
    MobileMenu,
    MobileMenuLinks
} from "./styles/NavBar.styles.jsx";

// Componente de barra de navegação
const Navbar = () => {
    const location = useLocation();
    const showElements = ["/"].includes(location.pathname);
    const [searchWords, setSearchWords] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Função para verificar se a tela é mobile
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
            setMobileMenuOpen(false);
        }
    };

    // Executar handleResize quando o componente montar e quando a janela for redimensionada
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Função para alternar o menu mobile
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <Nav>
            {showElements && !isMobile && (
                <Promotion>
                    <p>Transforme suas ideias em realidade! Garanta 30% de desconto com o código <PromotionHighlight>CRIE30</PromotionHighlight>. Válido até 21/05!</p>
                </Promotion>
            )}
            <NavBar>
                <div className="container">
                    <Link to={'/'}>Share Print</Link>
                    
                    {!isMobile && (
                        <SearchBar search={searchWords} setSearchWords={setSearchWords} />
                    )}
                    
                    {isMobile ? (
                        <>
                            <MobileMenuButton onClick={toggleMobileMenu}>
                                {mobileMenuOpen ? <IoCloseOutline size={28} /> : <IoMenuOutline size={28} />}
                            </MobileMenuButton>
                            
                            <MobileMenu isOpen={mobileMenuOpen}>
                                <SearchBar search={searchWords} setSearchWords={setSearchWords} />
                                
                                <MobileMenuLinks>
                                    {
                                        <>
                                            <Link to="produtos/panfleto" onClick={() => setMobileMenuOpen(false)}>Panfletos</Link>
                                            <Link to="produtos/etiqueta" onClick={() => setMobileMenuOpen(false)}>Etiquetas</Link>
                                            <Link to="produtos/envelope" onClick={() => setMobileMenuOpen(false)}>Envelopes</Link>
                                            <Link to="produtos/adesivo" onClick={() => setMobileMenuOpen(false)}>Adesivos</Link>
                                            <Link to="produtos/cartão" onClick={() => setMobileMenuOpen(false)}>Cartões</Link>
                                        </>
                                    }
                                    
                                    <div className="mobile-icons">
                                        <Link to={'perfil/favoritos'} onClick={() => setMobileMenuOpen(false)}>
                                            <IoHeartOutline size={22} /> Favoritos
                                        </Link>
                                        <Link to={'/carrinho'} onClick={() => setMobileMenuOpen(false)}>
                                            <IoCartOutline size={22} /> Carrinho
                                        </Link>
                                        <Link to="/perfil" onClick={() => setMobileMenuOpen(false)}>
                                            <IoPersonOutline size={22} /> Perfil
                                        </Link>
                                    </div>
                                    
                                </MobileMenuLinks>
                            </MobileMenu>
                        </>
                    ) : (
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
                    )}
                </div>
            </NavBar>
            <Line></Line>
            {showElements && !isMobile && (
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