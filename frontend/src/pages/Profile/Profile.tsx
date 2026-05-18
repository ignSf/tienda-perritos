/**
 * Profile page
 */

import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useUser } from '../../context/UserContext';
import { userService } from '../../api/userService';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';

const Profile: React.FC = () => {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState({
        nombre_completo: '',
        rut: '',
        nombre_usuario: '',
        correo: '',
        contrasena: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                nombre_completo: user.nombre_completo || '',
                rut: user.rut || '',
                nombre_usuario: user.nombre_usuario || '',
                correo: user.correo || '',
                contrasena: '', // Don't populate password
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.userid) return;

        setLoading(true);
        setMessage('');

        try {
            const updatedUser = {
                ...user,
                ...formData,
                contrasena: formData.contrasena || user.contrasena // Keep old password if not changed
            };

            // If password field is empty, don't send it to backend if backend handles it, 
            // but here we send it. The backend likely updates it. 
            // Ideally we should ask for current password but for now we follow simple update.

            const result = await userService.updateUser(updatedUser);
            setUser(result);
            setMessage('Perfil actualizado correctamente');
            setMessageType('success');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Error al actualizar perfil';
            setMessage(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="profile-page"><p>Debes iniciar sesión para ver tu perfil.</p></div>;
    }

    return (
        <div className="profile-page">
            <h1>Mi Perfil</h1>
            <div className="profile-container">
                <form onSubmit={handleSubmit}>
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
                        disabled // RUT usually shouldn't be changed
                    />
                    <Input
                        label="Nombre de Usuario"
                        type="text"
                        name="nombre_usuario"
                        value={formData.nombre_usuario}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Nueva Contraseña (dejar en blanco para mantener)"
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        placeholder="********"
                    />

                    <div className="profile-actions">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>

                    {message && <ValidationMessage type={messageType} message={message} />}
                </form>
            </div>
        </div>
    );
};

export default Profile;
