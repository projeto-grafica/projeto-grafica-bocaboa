import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SearchResults from "./pages/SearchResults.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/pesquisa" element={<SearchResults />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    );
}

export default AppRoutes;