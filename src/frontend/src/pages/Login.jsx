import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f5f5f5;
`;

const Card = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.8rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background: #0056b3;
    }
`;

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (email === "admin@example.com" && password === "123456") {
            login({ name: "Usuário", email });
            navigate("/dashboard");
        } else {
            setError("Credenciais inválidas!");
        }
    };

    return (
        <Container>
            <Card>
                <h1>Login</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Entrar</Button>
            </Card>
        </Container>
    );
};

export default Login;
