import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoCubeOutline,
  IoHelpCircleOutline,
  IoPersonCircleOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { Container, Welcome, WelcomeHeading, Picture, Email, CardsContainer, CardLink, IconContainer, TextContainer, CardTitle, CardDescription } from "./styles/Perfil.style";

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
