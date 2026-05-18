/**
 * Login page
 */

import React from 'react';
import './Login.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useUser } from '../../context/UserContext';

interface LoginProps {
    onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const { user } = useUser();

    const handleSuccess = () => {
        onNavigate('home');
    };

    if (user) {
        return (
            <div className="login-page">
                <h1>Ya has iniciado sesión</h1>
                <p className="welcome-message">Bienvenido, {user.nombre_completo}</p>
                <button onClick={() => onNavigate('home')} className="btn btn-primary">Ir al Inicio</button>
            </div>
        );
    }

    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            <LoginForm onSuccess={handleSuccess} />
            <p className="register-link">
                ¿No tienes cuenta? <span onClick={() => onNavigate('register')}>Regístrate aquí</span>
            </p>
        </div>
    );
};

export default Login;
