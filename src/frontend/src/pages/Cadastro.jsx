import { useState } from "react";
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
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
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

const LinkLogin = styled(Link)`
    margin-top: 1rem;
    text-decoration: none;
    color: #62A860;
    font-size: 0.9rem;
    text-align: center;

    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.p`
    color: #dc3545;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
`;

const Cadastro = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: "",
        geral: ""
    });

    const validateNome = (nome) => {
        if (!nome || nome.trim().length < 4) {
            return "Nome deve ter pelo menos 4 caracteres";
        }
        return "";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return "Email inválido";
        }
        return "";
    };

    const validateSenha = (senha) => {
        if (senha.length < 8) return "Senha deve ter pelo menos 8 caracteres";
        if (!/[A-Z]/.test(senha)) return "Senha deve ter pelo menos uma letra maiúscula";
        if (!/[a-z]/.test(senha)) return "Senha deve ter pelo menos uma letra minúscula";
        if (!/[0-9]/.test(senha)) return "Senha deve ter pelo menos um número";
        if (!/[!@#$%^&*]/.test(senha)) return "Senha deve ter pelo menos um caractere especial (!@#$%^&*)";
        return "";
    };

    const handleCadastro = async () => {
        const nomeError = validateNome(nome);
        const emailError = validateEmail(email);
        const senhaError = validateSenha(senha);

        setErrors({
            nome: nomeError,
            email: emailError,
            senha: senhaError
        });

        if (!nomeError && !emailError && !senhaError) {
            setLoading(true);
            try {
                console.log('Enviando requisição de cadastro:', { email, password: senha });
                
                const response = await fetch('https://v10k527pp4.execute-api.us-east-1.amazonaws.com/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password: senha
                    })
                });

                const data = await response.json();
                console.log('Resposta do cadastro:', data);

                if (!response.ok) {
                    throw new Error(data.message || 'Erro ao realizar cadastro');
                }

                localStorage.setItem('tempUserEmail', email);
                localStorage.setItem('userSub', data.userSub);
                navigate("/verificar-email");
            } catch (error) {
                console.error('Erro no cadastro:', error);
                setErrors({
                    ...errors,
                    geral: error.message || "Erro ao realizar cadastro. Tente novamente."
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container>
            <Card>
                <Title>Cadastro</Title>
                {errors.geral && <ErrorMessage>{errors.geral}</ErrorMessage>}
                <div>
                    <Input 
                        type="text" 
                        placeholder="Nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)}
                    />
                    {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
                </div>
                <div>
                    <Input
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </div>
                <div>
                    <Input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
                </div>
                <Button 
                    onClick={handleCadastro} 
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <LinkLogin to="/login">Já possui conta? Faça login</LinkLogin>
            </Card>
        </Container>
    );
};

export default Cadastro;
