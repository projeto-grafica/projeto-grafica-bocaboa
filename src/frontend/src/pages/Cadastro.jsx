import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./styles/Cadastro.styles";

const Cadastro = () => {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        senha: "",
        geral: ""
    });

    const validatename = (name) => {
        if (!name || name.trim().length < 4) {
            return "name deve ter pelo menos 4 caracteres";
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
        const nameError = validatename(name);
        const emailError = validateEmail(email);
        const senhaError = validateSenha(senha);

        setErrors({
            name: nameError,
            email: emailError,
            senha: senhaError
        });

        if (!nameError && !emailError && !senhaError) {
            setLoading(true);
            try {
                // Create a minimal valid address object
                const emptyAddress = {
                    cep: "00000000",
                    city: "Default",
                    state: "XX",
                    street: "Default Street",
                    number: "0"
                };
                
                const response = await fetch('https://v10k527pp4.execute-api.us-east-1.amazonaws.com/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password: senha,
                        name,
                        address: emptyAddress,  // Send a minimal valid address
                        addresses: [emptyAddress]  // Also send as an array
                    })
                });

                const data = await response.json();
                if (!response.ok) {
                    navigate("/verificar-email");

                }

                localStorage.setItem('tempUserEmail', email);
                localStorage.setItem('userSub', data.userSub);
                localStorage.setItem('userName', name);
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
        <S.Container>
            <S.Card>
                <S.Title>Cadastro</S.Title>
                {errors.geral && <S.ErrorMessage>{errors.geral}</S.ErrorMessage>}
                <div>
                    <S.Input 
                        type="text" 
                        placeholder="Nome" 
                        value={name} 
                        onChange={(e) => { 
                            setname(e.target.value); 
                            setErrors(prev => ({ ...prev, name: "" })); 
                        }}
                    />
                    {errors.name && <S.ErrorMessage>{errors.name}</S.ErrorMessage>}
                </div>
                <div>
                    <S.Input
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => { 
                            setEmail(e.target.value); 
                            setErrors(prev => ({ ...prev, email: "" })); 
                        }}
                    />
                    {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
                </div>
                <div>
                    <S.Input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={(e) => { 
                            setSenha(e.target.value); 
                            setErrors(prev => ({ ...prev, senha: "" })); 
                        }}
                    />
                    {errors.senha && <S.ErrorMessage>{errors.senha}</S.ErrorMessage>}
                </div>
                <S.Button 
                    onClick={handleCadastro} 
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </S.Button>
                <S.LinkLogin to="/login">Já possui conta? Faça login</S.LinkLogin>
            </S.Card>
        </S.Container>
    );
};

export default Cadastro;