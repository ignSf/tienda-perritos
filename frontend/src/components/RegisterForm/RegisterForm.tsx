/**
 * RegisterForm component
 */

import React, { useState } from 'react';
import './RegisterForm.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ValidationMessage from '../ValidationMessage/ValidationMessage';
import { userService } from '../../api/userService';
import { useUser } from '../../context/UserContext';

const RegisterForm: React.FC = () => {
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        nombre_completo: '',
        rut: '',
        nombre_usuario: '',
        correo: '',
        contrasena: '',
        codigoAdmin: '',
    });
    const [birthDate, setBirthDate] = useState('');
    const [isDuoc, setIsDuoc] = useState(false);
    const [isOfAge, setIsOfAge] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'correo') {
            setIsDuoc(value.endsWith('@duoc.cl') || value.endsWith('@profesor.duoc.cl'));
        }
    };

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBirthDate = e.target.value;
        setBirthDate(newBirthDate);

        const today = new Date();
        const birthDateObj = new Date(newBirthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        setIsOfAge(age >= 18);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isOfAge) {
            setMessage('Debes ser mayor de 18 años para registrarte.');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const { codigoAdmin, ...userFields } = formData;
            const userData = {
                ...userFields,
                rol: 'cliente',
            };

            const adminCode = codigoAdmin.trim() || undefined;
            await userService.createUser(userData, adminCode);

            // Auto-login
            const response = await userService.login(userData.nombre_usuario, userData.contrasena);
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

            let successMsg = '¡Registro exitoso!';
            if (isDuoc) {
                successMsg += ' Se ha aplicado tu descuento del 20% de por vida.';
            }
            setMessage(successMsg);
            setMessageType('success');

            // Reset form
            setFormData({
                nombre_completo: '',
                rut: '',
                nombre_usuario: '',
                correo: '',
                contrasena: '',
                codigoAdmin: '',
            });
            setBirthDate('');
        } catch (error: any) {
            console.error('Registration error:', error);
            const detailedError = {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                data: error.response?.data
            };
            setMessage(JSON.stringify(detailedError, null, 2));
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <Input
                label="Nombre Completo"
                type="text"
                name="nombre_completo"
                value={formData.nombre_completo}
                onChange={handleChange}
                required
            />

            <Input
                label="RUT"
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="12.345.678-9"
                required
            />

            <Input
                label="Nombre de Usuario"
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
            />

            <div>
                <Input
                    label="Correo Electrónico"
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />
                {isDuoc && (
                    <ValidationMessage
                        type="info"
                        message="¡Correo de Duoc detectado! Disfruta de un 20% de descuento."
                    />
                )}
            </div>

            <Input
                label="Contraseña"
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
            />

            <div>
                <Input
                    label="Fecha de Nacimiento"
                    type="date"
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    required
                />
                {!isOfAge && birthDate && (
                    <ValidationMessage
                        type="error"
                        message="Debes ser mayor de 18 años."
                    />
                )}
            </div>

            <Input
                label="Código Admin (Opcional)"
                type="text"
                name="codigoAdmin"
                value={formData.codigoAdmin}
                onChange={handleChange}
                placeholder="Ingresa el código de administrador si lo tienes"
            />

            <Button type="submit" disabled={loading || !isOfAge} className="submit-btn">
                {loading ? 'Registrando...' : 'Registrarse'}
            </Button>

            {message && <ValidationMessage type={messageType} message={message} />}
        </form>
    );
};

export default RegisterForm;
