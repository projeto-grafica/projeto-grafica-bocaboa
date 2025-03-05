import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    
    return (
        <div>
            <h1>Dashboard</h1>
            {user ? <p>Bem-vindo, {user.name}!</p> : <p>Carregando...</p>}
        </div>
    );
};

export default Dashboard;
