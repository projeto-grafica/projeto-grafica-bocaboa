import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Login from "./pages/Login.jsx";
import Perfil from "./pages/Perfil.jsx";
import Produtos from "./pages/Produtos.jsx";
import Produto from "./pages/Produto.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/NavBar.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import VerificarEmail from "./pages/VerificarEmail.jsx";
import Suporte from "./pages/Suporte.jsx";
import CompraFinalizada from "./pages/CompraFinalizada.jsx";

const AppRoutes = () => {
    const location = useLocation(); 
    const hideNavbar = ["/login", "/cadastro", "/verificar-email"].includes(location.pathname);

    return (
        <>
            {!hideNavbar && <Navbar />} 

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/verificar-email" element={<VerificarEmail />} />
                <Route path="/suporte" element={<Suporte />} />
                <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} />} />
                <Route path="/perfil/pedidos" element={<ProtectedRoute element={<Pedidos />} />} />
                <Route path="/perfil/favoritos" element={<ProtectedRoute element={<Favoritos />} />} />
                <Route path="/carrinho" element={<ProtectedRoute element={< Carrinho/>} />}/>
                <Route path="/produtos/:nome" element={<Produtos />} />
                <Route path="/produto/:nome" element={<Produto />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/compra-finalizada" element={<ProtectedRoute element={< CompraFinalizada/>} />}/>
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
};

export default AppRoutes;
