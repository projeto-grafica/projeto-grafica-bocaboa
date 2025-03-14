import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Promotion = styled.div`
    pointer-events: none;
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #62A860, #F27E16);
    background-size: 200% auto;
    width: 100%;
    padding: 6px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
   
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg,
                      rgba(255, 255, 255, 0) 0%,
                      rgba(255, 255, 255, 0.2) 50%,
                      rgba(255, 255, 255, 0) 100%);
        animation: shine 2.5s infinite;
    }
    p {
        margin: 0;
        font-size: 0.9375rem;
        color: #2E2E30;
        font-weight: 600;
        letter-spacing: 0.3px;
        text-align: center;
    }
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
    }
   
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.015); }
        100% { transform: scale(1); }
    }
   
    @keyframes shine {
        0% { left: -100%; }
        100% { left: 100%; }
    }

    &.mobile-promotion {
        margin-top: 20px;
        width: 100%;
        padding: 10px;
        border-radius: 8px;
    }
`;

export const PromotionHighlight = styled.span`
    background-color: purple;
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    font-weight: 700;
    display: inline-block;
    transform: rotate(-2deg);
    animation: attention 3s ease-in-out infinite alternate;
   
    @keyframes attention {
        0% { transform: rotate(-1deg) scale(1); }
        100% { transform: rotate(1deg) scale(1.1); }
    }
`;

export const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2E2E30;
    width: 100%;
    height: 80px;
    position: relative;
    
    a {
        font-size: 2rem;
        color: white;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;    
        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }
    
    .container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1080px;
        margin: 0 auto;
        align-items: center;
        padding: 0 15px;
        
        @media (max-width: 768px) {
            justify-content: space-between;
        }
    }
    
    @media (max-width: 768px) {
        height: 70px;
    }
`;

export const MobileMenuButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    
    &:hover {
        color: #F27E16;
    }
`;

export const MobileMenu = styled.div`
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: #2E2E30;
    z-index: 1000;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
`;

export const MobileMenuLinks = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    
    a {
        font-size: 1.2rem;
        color: white;
        padding: 15px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        text-decoration: none;
        
        &:hover {
            color: #F27E16;
        }
    }
    
    .mobile-icons {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        
        a {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            
            svg {
                margin-right: 5px;
            }
        }
    }
`;

export const Line = styled.div`
    width: 100%;
    height: 5px;
    background-color: #F27E16;    
`;

export const LinksBar = styled.nav`
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 0 60px;
    
    .container {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        max-width: 1200px;
        padding: 15px 0;
        gap: 2rem;
        flex-wrap: wrap;
        
        @media (max-width: 768px) {
            justify-content: center;
            gap: 1rem;
        }
        
        a {
            font-size: 0.875rem;
            color: #333;
            text-decoration: none;
            transition: color 0.3s;
        }

        a:hover{
            color: #F27E16;
        }
    }
`;

export const ContainerIcons = styled.div`
    display: flex;
    min-width: 150px;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
        gap: 1rem;
    }
    
    .icons {
        color: white;
        transition: color 0.3s;
    }
   
    .icons:hover {
        color: #F27E16;
    }
`;