import React from 'react';

export interface Field extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    classNameInput?: string;
    classNameLabel?: string;
    maxLength?: number;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    requiredField?: boolean;
}

export type FieldsListArray = Field[];