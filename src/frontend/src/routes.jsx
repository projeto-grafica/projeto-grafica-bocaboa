import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Login from "./pages/Login.jsx";
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
                {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
};

export default AppRoutes;
