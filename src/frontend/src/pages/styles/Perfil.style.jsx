import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    padding: 2rem 7.5vw;
    background-color: #f5f5f5;
`;

export const Welcome = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 8px;

    .blockProfile {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .blockProfileInfos {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
    }
`;

export const WelcomeHeading = styled.h1`
    font-size: 24px;
    color: #2e2e30;
    margin: 0;
`;

// Atualize o componente Picture para exibir um avatar com a inicial do nome
export const Picture = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #2e2e30;
`;

export const Email = styled.p`
    color: #666;
    font-size: 16px;
    margin: 0;
`;

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35vw, 2fr));
    gap: 2rem;
`;

export const CardLink = styled(Link)`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 2.5rem 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }
`;

export const IconContainer = styled.div`
  margin-right: 2rem;
  color: #f27e16;
`;

export const TextContainer = styled.div``;

export const CardTitle = styled.h3`
  font-size: 20px;
  color: #2e2e30;
  margin: 0 0 0.5rem 0;
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;
