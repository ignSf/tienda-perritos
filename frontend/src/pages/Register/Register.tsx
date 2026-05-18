/**
 * Register page
 */

import React from 'react';
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const Register: React.FC = () => {
    return (
        <div className="register-page">
            <h1>Crear una Cuenta</h1>
            <RegisterForm />
        </div>
    );
};

export default Register;
