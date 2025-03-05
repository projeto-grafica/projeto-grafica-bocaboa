import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 400px;
    z-index: 2;
    position: relative;
`;

const Title = styled.h1`
    color: #333;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
`;

const Subtitle = styled.p`
    color: #666;
    text-align: center;
    font-size: 0.9rem;
    margin: 0;
    max-width: 280px;
`;

const CodeContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
`;

const CodeInput = styled.input`
    width: 45px;
    height: 45px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1.5rem;
    text-align: center;
    background: #f5f5f5;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #62A860;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(98, 168, 96, 0.1);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const Button = styled.button`
    padding: 0.8rem 2rem;
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
        box-shadow: 0 2px 8px rgba(98, 168, 96, 0.3);
    }
    
    &:disabled {
        background: #cccccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const ResendLink = styled.button`
    background: none;
    border: none;
    color: #62A860;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;

    &:hover {
        color: #F27E16;
    }
`;

const ErrorMessage = styled.p`
    color: #dc3545;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    text-align: center;
`;

const SuccessMessage = styled.p`
    color: #62A860;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    text-align: center;
`;

const VerificarEmail = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(Array(6).fill(""));
    const [isComplete, setIsComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const inputRefs = useRef([]);

    useEffect(() => {
        const userEmail = localStorage.getItem('tempUserEmail');
        if (!userEmail) {
            navigate('/cadastro');
        }
    }, [navigate]);

    useEffect(() => {
        setIsComplete(code.every(digit => digit !== ""));
    }, [code]);

    const handleChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1);
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.split("").slice(0, 6);
        setCode([...digits, ...Array(6 - digits.length).fill("")]);
        
        if (digits.length > 0) {
            inputRefs.current[Math.min(digits.length, 5)].focus();
        }
    };

    const handleVerify = async () => {
        setLoading(true);
        setError("");
        
        try {
            const email = localStorage.getItem('tempUserEmail');
            const enteredCode = code.join("");
            
            console.log('Enviando código de verificação:', { email, code: enteredCode });

            const response = await fetch('https://v10k527pp4.execute-api.us-east-1.amazonaws.com/auth/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    code: enteredCode
                })
            });

            const data = await response.json();
            console.log('Resposta da verificação:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Código inválido');
            }

            setSuccess("Email verificado com sucesso!");
            setTimeout(() => {
                localStorage.removeItem('tempUserEmail');
                localStorage.removeItem('userSub');
                navigate("/login");
            }, 1500);
        } catch (err) {
            console.error('Erro na verificação:', err);
            setError(err.message || "Erro ao verificar código. Tente novamente.");
            setCode(Array(6).fill(""));
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendDisabled(true);
        setCountdown(30);
        setError("");
        
        try {
            // Simular reenvio do código
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess("Novo código enviado!");
            
            // Iniciar countdown
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            setError("Erro ao reenviar código.");
            setResendDisabled(false);
        }
    };

    return (
        <Container>
            <Card>
                <Title>Verificação de Email</Title>
                <Subtitle>
                    Digite o código de 6 dígitos que enviamos para{' '}
                    {localStorage.getItem('tempUserEmail')}
                </Subtitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
                <CodeContainer>
                    {code.map((digit, index) => (
                        <CodeInput
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleChange(index, e.target.value)}
                            onKeyDown={e => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            autoFocus={index === 0}
                        />
                    ))}
                </CodeContainer>
                <Button 
                    onClick={handleVerify} 
                    disabled={!isComplete || loading}
                >
                    {loading ? "Verificando..." : "Verificar"}
                </Button>
                <ResendLink 
                    onClick={handleResend}
                    disabled={resendDisabled}
                >
                    {resendDisabled 
                        ? `Aguarde ${countdown}s para reenviar` 
                        : "Reenviar código"}
                </ResendLink>
            </Card>
        </Container>
    );
};

export default VerificarEmail;
