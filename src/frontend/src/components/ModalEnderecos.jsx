import React, { useState, useEffect } from "react";
import * as S from "./styles/ModalEnderecos.style";
import { jwtDecode } from "jwt-decode";

const ModalEnderecos = ({ onClose }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const idToken = localStorage.getItem("idToken");

            if (idToken) {
                try {
                    const decodedToken = jwtDecode(idToken);
                    const userId = decodedToken.sub;
                    const apiUrl = `https://v10k527pp4.execute-api.us-east-1.amazonaws.com/users/${userId}`;

                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setUserData(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setError(error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <S.ModalOverlay>
                <S.ModalContainer>
                    <S.ModalTitle>Carregando...</S.ModalTitle>
                </S.ModalContainer>
            </S.ModalOverlay>
        );
    }

    if (error) {
        return (
            <S.ModalOverlay>
                <S.ModalContainer>
                    <S.ModalTitle>Erro: {error.message}</S.ModalTitle>
                    <S.ModalCloseButton onClick={onClose}>Fechar</S.ModalCloseButton>
                </S.ModalContainer>
            </S.ModalOverlay>
        );
    }

    return (
        <S.ModalOverlay>
            <S.ModalContainer>
                <S.ModalTitle>Endereço do Usuário</S.ModalTitle>
                {userData && (
                    <S.AddressList>
                        <S.AddressItem>Nome: {userData.name}</S.AddressItem>
                        <S.AddressItem>Email: {userData.email}</S.AddressItem>
                        <S.AddressItem>Rua: {userData.address.logradouro}, {userData.address.numero}</S.AddressItem>
                        <S.AddressItem>Complemento: {userData.address.complemento}</S.AddressItem>
                        <S.AddressItem>Bairro: {userData.address.bairro}</S.AddressItem>
                        <S.AddressItem>Cidade: {userData.address.cidade} - {userData.address.estado}</S.AddressItem>
                        <S.AddressItem>CEP: {userData.address.cep}</S.AddressItem>
                    </S.AddressList>
                )}
                <S.ModalCloseButton onClick={onClose}>Fechar</S.ModalCloseButton>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
};

export default ModalEnderecos;
