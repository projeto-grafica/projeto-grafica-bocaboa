import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
`;

export const Promotion = styled.div`
    pointer-events: none;
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #62A860, #F27E16);
    background-size: 200% auto;
    width: 100vw;
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
        font-size: 15px;
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
    width: 100vw;
    height: 12vh;
    padding: 0 7.5vw;

    a {
        font-size: 32px;
        color: white;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
    }

    .container{
        display: flex;
        justify-content: space-between;
        width: 85vw;
    }
`;

export const Line = styled.div`
    width: 100vw;
    height: 0.7vh;
    background-color: #F27E16;    
`;

export const LinksBar = styled.nav`
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100vw;
    gap: 5vw;

    .container {
        display: flex;
        justify-content: start;
        width: 85vw;
        padding: 15px 0;
        gap: 5vw;

        a {
            font-size: 14px;
            color: #2E2E30;
            transition: color 0.3s;
            font-weight: 400;
            text-decoration: none;
            &:hover {
                color: #F27E16;
            }
        }
    }
`;

export const ContainerIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12vw;

    .icons {
        color: white;
        transition: color 0.3s;
    }
    
    .icons:hover {
        color: orange;
    }
`;
