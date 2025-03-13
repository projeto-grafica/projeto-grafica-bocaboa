import React from 'react';
import { 
    FooterContainerMain,
    FooterContainer,
    Section,
    Title,
    Description,
    List,
    ListItem,
    StyledLink,
    SocialIcons,
    IconLink,
    CTA
 } from './styles/Footer.style';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

const Footer = () => {
    return (
        <FooterContainerMain>
            <FooterContainer>
                <Section>
                    <Title>Links Rápidos</Title>
                    <List>
                        <ListItem><StyledLink to="/produtos/panfleto">Panfletos</StyledLink></ListItem>
                        <ListItem><StyledLink to="/produtos/etiqueta">Etiquetas</StyledLink></ListItem>
                        <ListItem><StyledLink to="/produtos/envelope">Envelopes</StyledLink></ListItem>
                        <ListItem><StyledLink to="/suporte">Suporte</StyledLink></ListItem>
                        <ListItem><StyledLink to="/faq">FAQ</StyledLink></ListItem>
                    </List>
                </Section>

                <Section>
                    <Title>Institucional</Title>
                    <List>
                        <ListItem><StyledLink to="/sobre">Sobre Nós</StyledLink></ListItem>
                        <ListItem><StyledLink to="/privacidade">Política de Privacidade</StyledLink></ListItem>
                        <ListItem><StyledLink to="/termos">Termos de Uso</StyledLink></ListItem>
                    </List>
                </Section>

                <Section>
                    <Title>Redes Sociais</Title>
                    <Description>Siga-nos para novidades e promoções!</Description>
                    <SocialIcons>
                        <IconLink href="#" target="_blank"><IoLogoFacebook /></IconLink>
                        <IconLink href="#" target="_blank"><IoLogoInstagram /></IconLink>
                        <IconLink href="#" target="_blank"><IoLogoTwitter /></IconLink>
                    </SocialIcons>
                </Section>

                <Section>
                    <Title>Contato e Suporte</Title>
                    <Description>
                        Precisa de ajuda? Ligue para (XX) XXXX-XXXX ou envie um email para contato@shareprint.com.br
                    </Description>
                    <CTA href="/promocoes">Aproveite Descontos Imperdíveis</CTA>
                </Section>
            </FooterContainer>
        </FooterContainerMain>
    );
};

export default Footer;
