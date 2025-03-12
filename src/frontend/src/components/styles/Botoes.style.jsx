import styled from "styled-components";

export const ButtonDefault = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 100%;

    button{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #62A860;
    border: 1.5px solid #62A860;
    gap: 0.5vw;
    width: 100%;
    height: 6vh;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
        &:hover {
            background-color: #62A860;
            color: white;
        }
    }
`;

export const ButtonFull = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
    border-radius: 8px;

    button {
        gap: 0.5vw;
        width: 15vw;
        height: 6vh;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
        background-color: #62A860;
        color: white;
        border: none;

        &:hover {
        background-color: #5ea95c;
    }
}
`;
