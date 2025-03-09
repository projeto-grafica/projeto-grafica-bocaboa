import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  IoCubeOutline,
  IoHelpCircleOutline,
  IoPersonCircleOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
    padding: 2rem 7.5vw;
    background-color: #f5f5f5;
`;

const Welcome = styled.div`
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

const WelcomeHeading = styled.h1`
    font-size: 24px;
    color: #2e2e30;
    margin: 0;
`;

// Atualize o componente Picture para exibir um avatar com a inicial do nome
const Picture = styled.div`
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

const Email = styled.p`
    color: #666;
    font-size: 16px;
    margin: 0;
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35vw, 2fr));
    gap: 2rem;
`;

const CardLink = styled(Link)`
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

const IconContainer = styled.div`
  margin-right: 2rem;
  color: #f27e16;
`;

const TextContainer = styled.div``;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #2e2e30;
  margin: 0 0 0.5rem 0;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

const Perfil = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
  }, [user]);

  const cards = [
    {
      to: "pedidos",
      icon: <IoCubeOutline size={30} />,
      title: "Meus Pedidos",
      description: "Veja históricos e acompanhe suas compras",
    },
    {
      to: "/suporte",
      icon: <IoHelpCircleOutline size={30} />,
      title: "Suporte",
      description: "Entre em contato conosco para sanar suas dúvidas",
    },
    {
      to: "meus-dados",
      icon: <IoPersonCircleOutline size={30} />,
      title: "Meus Dados",
      description: "Confira os seus dados e privacidade",
    },
    {
      to: "favoritos",
      icon: <IoHeartOutline size={30} />,
      title: "Favoritos",
      description: "Consulte sua lista de produtos favoritados",
    },
  ];  

  return (
    <Container>
      <Welcome>
        <div className="blockProfile">
          {/* Exibe a primeira letra do nome do usuário */}
          <Picture>
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </Picture>
          <div className="blockProfileInfos">
            <WelcomeHeading>Bem vindo, {user?.name || "usuário"}</WelcomeHeading>
            <Email>{user?.email || "email@email.com"}</Email>
          </div>
          {/* LOGOUT BUTTON */}
          <button onClick={logout}>Logout</button>
        </div>
      </Welcome>

      <CardsContainer>
        {cards.map((card, index) => (
          <CardLink to={card.to} key={index}>
            <IconContainer>{card.icon}</IconContainer>
            <TextContainer>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </TextContainer>
          </CardLink>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default Perfil;
