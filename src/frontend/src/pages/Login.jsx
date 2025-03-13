import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Card, Input, Button, Title, LinkCadastro } from "./styles/Login.style";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
    
            const response = await fetch('https://v10k527pp4.execute-api.us-east-1.amazonaws.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Credenciais inválidas');
            }
    
            const { tokens } = data;

            const base64Url = tokens.idToken.split('.')[1]; 
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jwt = JSON.parse(window.atob(base64));
            const userName = jwt.name;

            login({
                name: userName,
                email,
                accessToken: tokens.accessToken,
                idToken: tokens.idToken
            });

            navigate(location?.state?.from?.pathname || "/");
        } catch (err) {
            console.error('Erro no login:', err);
            setError(err.message || "Erro ao realizar login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Card>
                <Title>Login</Title>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Input 
                        type="password" 
                        placeholder="Senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>
                <LinkCadastro to="/cadastro">
                    Ainda não tem conta? Cadastre-se
                </LinkCadastro>
            </Card>
        </Container>
    );
};

export default Login;