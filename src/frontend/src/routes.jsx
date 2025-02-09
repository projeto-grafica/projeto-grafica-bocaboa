import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Login from "./pages/Login.jsx";
import Perfil from "./pages/Perfil.jsx";
import Produtos from "./pages/Produtos.jsx";
import Produto from "./pages/Produto.jsx";
import Favoritos from "./pages/Favoritos.jsx";
// import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/NavBar.jsx";

const AppRoutes = () => {
    const location = useLocation(); 
    const hideNavbar = ["/login", "/cadastro"].includes(location.pathname);

    return (
        <>
            {!hideNavbar && <Navbar />} 

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/pesquisa" element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/produtos/:nome" element={<Produtos />} />
                <Route path="/perfil/favoritos" element={<Favoritos />} />
                <Route path="/produto/:nome" element={<Produto />} />
                {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
};

export default AppRoutes;
