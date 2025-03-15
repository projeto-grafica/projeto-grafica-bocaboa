import styled from "styled-components";

export const Container = styled.div`
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

export const Card = styled.div`
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
    
    @media (max-aspect-ratio: 4/3) {
        width: 80%;
        padding: 5%;
    }
`;

export const Title = styled.h1`
    color: #333;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
`;

export const Subtitle = styled.p`
    color: #666;
    text-align: center;
    font-size: 0.9rem;
    margin: 0;
    max-width: 280px;
`;

export const CodeContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
`;

export const CodeInput = styled.input`
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

    @media (max-aspect-ratio: 4/3) {
        width: 38px;
        height: 38px;
    }
`;

export const Button = styled.button`
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

export const ResendLink = styled.button`
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

export const ErrorMessage = styled.p`
    color: #dc3545;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    text-align: center;
`;

export const SuccessMessage = styled.p`
    color: #62A860;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    text-align: center;
`;
