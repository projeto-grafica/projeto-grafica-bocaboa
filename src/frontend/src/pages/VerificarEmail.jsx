import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles/VerificarEmail.style";

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
        <S.Container>
            <S.Card>
                <S.Title>Verificação de Email</S.Title>
                <S.Subtitle>
                    Digite o código de 6 dígitos que enviamos para{' '}
                    {localStorage.getItem('tempUserEmail')}
                </S.Subtitle>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                {success && <S.SuccessMessage>{success}</S.SuccessMessage>}
                <S.CodeContainer>
                    {code.map((digit, index) => (
                        <S.CodeInput
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
                </S.CodeContainer>
                <S.Button 
                    onClick={handleVerify} 
                    disabled={!isComplete || loading}
                >
                    {loading ? "Verificando..." : "Verificar"}
                </S.Button>
                <S.ResendLink 
                    onClick={handleResend}
                    disabled={resendDisabled}
                >
                    {resendDisabled 
                        ? `Aguarde ${countdown}s para reenviar` 
                        : "Reenviar código"}
                </S.ResendLink>
            </S.Card>
        </S.Container>
    );
};

export default VerificarEmail;
