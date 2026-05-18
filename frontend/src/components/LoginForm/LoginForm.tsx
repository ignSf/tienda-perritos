/**
 * LoginForm component
 */

import React, { useState } from 'react';
import './LoginForm.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ValidationMessage from '../ValidationMessage/ValidationMessage';
import { userService } from '../../api/userService';
import { useUser } from '../../context/UserContext';

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        contrasena: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await userService.login(formData.nombre_usuario, formData.contrasena);
            const user = {
                userid: response.id,
                nombre_usuario: response.username,
                correo: response.email,
                rol: response.role,
                token: response.token,
                nombre_completo: response.nombreCompleto,
                rut: response.rut,
                contrasena: ''
            };
            setUser(user);
            setMessage('¡Inicio de sesión exitoso!');
            if (onSuccess) {
                setTimeout(onSuccess, 1000);
            }
        } catch (error: any) {
            console.error('Login error:', error);
            const detailedError = {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                data: error.response?.data
            };
            setMessage(JSON.stringify(detailedError, null, 2));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <Input
                label="Nombre de Usuario"
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
            />

            <Input
                label="Contraseña"
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
            />

            <Button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            {message && <ValidationMessage type={message.includes('exitoso') ? 'success' : 'error'} message={message} />}
        </form>
    );
};

export default LoginForm;
