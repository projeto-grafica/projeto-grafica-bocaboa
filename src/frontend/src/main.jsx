import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OtherContextProvider } from "./context/OtherContext";
import AppRoutes from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <OtherContextProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </OtherContextProvider>
        </AuthProvider>
    </StrictMode>
);
