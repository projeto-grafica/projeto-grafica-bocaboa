import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login({ name: "Usuário" });
        navigate("/dashboard"); 
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;
