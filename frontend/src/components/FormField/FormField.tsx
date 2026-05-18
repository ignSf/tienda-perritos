/**
 * FormField component
 */

import React from 'react';
import './FormField.css';

interface FormFieldProps {
    label: string;
    children: React.ReactNode;
    error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, error }) => {
    return (
        <div className="form-field">
            <label className="form-label">{label}</label>
            {children}
            {error && <span className="field-error">{error}</span>}
        </div>
    );
};

export default FormField;
