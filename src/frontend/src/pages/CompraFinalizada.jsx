import { useAuth } from "../context/AuthContext";
import styled from 'styled-components';
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Botao from "../components/Botoes";

const CompraFinalizada = () => {
    const { user } = useAuth();
    
    return (
        <Container>
            <div className="card">
                <FaCircleCheck size={50} color="#62A860"/>
                <div className="text">
                    <p>Seu pedido foi processado!</p>
                    <div className="infos">
                        <p>As informações do pedido foram enviadas para</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="divBotao">
                    <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
                        <Botao Text="Explorar outros produtos" Type="vazado" weight="500" />
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default CompraFinalizada;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 87vh;

    .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        width: 58vw;
        height: auto;
        padding: 10vh 0;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

        .divBotao{
            display: flex;
            justify-content: center;
            width: 40%;
        }    

        .text{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #2E2E30;
            margin-bottom: 5vh;
            
            > p {
                font-size: 18px;
                font-size: 24px;
                font-weight: 500;
            }

            
            .infos{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 16px;

                p{
                    color- #2E2E30;
                    margin: 2vh;
                    &:last-of-type{
                        color: #62A860
                    }
                }
            }
        }
    
    }
`;
