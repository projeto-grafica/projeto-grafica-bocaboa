import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #2E2E30;
    position: relative;
    overflow: hidden;
    
    &::before, &::after {
        content: "";
        position: absolute;
        width: 150%;
        height: 50%;
        background: linear-gradient(90deg, rgba(98, 168, 96, 0.4), rgba(242, 126, 22, 0.3));
        animation: wave 15s infinite linear;
        z-index: 1;
        filter: blur(1px); 
    }
    &::before {
        bottom: -10%;
        left: -20%;
        transform: rotate(-3deg);
    }
    &::after {
        bottom: -25%;
        right: -25%;
        transform: rotate(2deg);
        animation-delay: 3s;
    }
    @keyframes wave {
        0% { transform: translateX(0) rotate(-3deg); }
        50% { transform: translateX(-15%) rotate(-3deg); }
        100% { transform: translateX(0) rotate(-3deg); }
    }
`;

const Card = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 320px;
    z-index: 2;
    position: relative;

    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

const Input = styled.input`
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f5f5f5;
    color: #444;
    width: 100%;
    box-sizing: border-box;
    
    &::placeholder {
        color: #888;
    }
    
    &:focus {
        outline: none;
        background-color: #efefef;
    }
`;

const Button = styled.button`
    padding: 0.8rem;
    background: linear-gradient(90deg, #62A860, #F27E16);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(105, 119, 242, 0.5);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
`;

const LinkCadastro = styled(Link)`
    margin-top: 1rem;
    text-decoration: none;
    color: #62A860;
    font-size: 0.9rem;
    text-align: center;

    &:hover {
        text-decoration: underline;
    }
`;

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
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

            navigate("/");
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