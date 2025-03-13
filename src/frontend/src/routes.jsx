import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Endereco from "./pages/Endereco.jsx";
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
import Footer from "./components/Footer";

const AppRoutes = () => {
    const location = useLocation(); 
    const hideNavbar = ["/login", "/cadastro", "/verificar-email"].includes(location.pathname);
    const hideFooter = ["/login", "/cadastro", "/verificar-email", "/compras/endereco"].includes(location.pathname);

    return (
        <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}>
            {!hideNavbar && <Navbar />} 

            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/verificar-email" element={<VerificarEmail />} />
                <Route path="/suporte" element={<Suporte />} />

                {/* Rotas Autenticadas */}
                <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} />} />
                <Route path="/perfil/pedidos" element={<ProtectedRoute element={<Pedidos />} />} />
                <Route path="/perfil/favoritos" element={<ProtectedRoute element={<Favoritos />} />} />
                <Route path="/carrinho" element={<ProtectedRoute element={< Carrinho/>} />}/>
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

                {/* Rotas de Compras Autenticadas */}
                <Route path="/compras/endereco" element={<ProtectedRoute element={<Endereco />} />} />

                {/* Rotas de Produtos */}
                <Route path="/produtos/:nome" element={<Produtos />} />
                <Route path="/produto/:nome" element={<Produto />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/compra-finalizada" element={<ProtectedRoute element={< CompraFinalizada/>} />}/>

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>

            {!hideNavbar && <Footer />}
        </body>
    );
};

export default AppRoutes;
