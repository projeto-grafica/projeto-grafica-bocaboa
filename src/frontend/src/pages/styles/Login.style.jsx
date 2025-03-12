import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const Input = styled.input`
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

export const Button = styled.button`
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

export const Title = styled.h1`
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
`;

export const LinkCadastro = styled(Link)`
    margin-top: 1rem;
    text-decoration: none;
    color: #62A860;
    font-size: 0.9rem;
    text-align: center;

    &:hover {
        text-decoration: underline;
    }
`;
