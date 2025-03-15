import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
    box-sizing: border-box;
`;

export const Main = styled.div`
    max-width: 1100px;
    width: 100%;
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
        flex-wrap: wrap;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
        }
    }

    .blockProfileInfos {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        flex-grow: 1;
    }

    button {
        padding: 8px 15px;
        background-color: #f27e16;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #e06c00;
        }

        @media (max-width: 768px) {
            align-self: flex-start;
        }
    }
`;

export const WelcomeHeading = styled.h1`
    font-size: 24px;
    color: #2e2e30;
    margin: 0;
    
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

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
    
    @media (max-width: 480px) {
        width: 60px;
        height: 60px;
        font-size: 28px;
    }
`;

export const Email = styled.p`
    color: #666;
    font-size: 16px;
    margin: 0;
    word-break: break-word;
`;

export const CardsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

export const CardLink = styled(Link)`
    max-width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    padding: 2rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }
    
    @media (max-aspect-ratio: 4/3) {
        padding: 1.5rem 1rem;
    }
`;

export const IconContainer = styled.div`
  margin-right: 2rem;
  color: #f27e16;
  
  @media (max-width: 480px) {
    margin-right: 1rem;
  }
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  color: #2e2e30;
  margin: 0 0 0.5rem 0;
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
