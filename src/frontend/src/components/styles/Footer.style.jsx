import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

export const FooterContainerMain = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #2E2E30;
    border-top: 3px solid #F27E16;
`

export const FooterContainer = styled.footer`
    max-width: 1080px;
    background-color: #2E2E30;
    color: #fff;
    padding: 2rem 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    font-size: 0.875rem;
    
    @media (min-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 2.5rem 1.5rem;
    }
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        padding: 2.5rem 2rem;
    }
    
    @media (min-width: 992px) {
        grid-template-columns: repeat(4, 1fr);
        padding: 2.5rem;
    }
    
    @media (min-width: 1200px) {
        padding: 2.5rem max(2.5rem, 5%);
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h3`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #fff;
`;

export const Description = styled.p`
    color: #ddd;
    line-height: 1.6;
    margin-top: 0;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ListItem = styled.li`
    margin-bottom: 0.5rem;
`;

export const StyledLink = styled(Link)`
    color: #ddd;
    text-decoration: none;
    transition: color 0.3s;
    display: inline-block;
    padding: 0.25rem 0;

    &:hover {
        color: #F27E16;
    }
`;

export const SocialIcons = styled.div`
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;
    margin-top: 0.5rem;
`;

export const IconLink = styled.a`
    color: #ddd;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #F27E16;
    }
`;

export const CTA = styled.a`
    background-color: #F27E16;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    text-decoration: none;
    display: inline-block;
    margin-top: 1.25rem;
    transition: background-color 0.3s;
    font-weight: 500;
    text-align: center;

    &:hover {
        background-color: #62A860;
    }
`;

// Novo componente para copyright e informações adicionais
export const BottomBar = styled.div`
    grid-column: 1 / -1;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    font-size: 0.75rem;
    color: #aaa;
    
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;