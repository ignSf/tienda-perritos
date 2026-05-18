/**
 * ValidationMessage component
 */

import React from 'react';
import './ValidationMessage.css';

interface ValidationMessageProps {
    type: 'success' | 'error' | 'info';
    message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ type, message }) => {
    return (
        <p className={`validation-message validation-${type}`}>
            {message}
        </p>
    );
};

export default ValidationMessage;
