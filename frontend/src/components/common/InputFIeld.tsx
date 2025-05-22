/*
  This is a reusable input field component for forms in the Task Management Platform.
  It supports labels, error display, custom styling, and accessibility features.
  Use this component to keep input UI and validation consistent across the app.
*/
import React from "react";


interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    inputClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    className = "",
    inputClassName = "",
    id,
    name,
    value,
    onChange,
    onBlur,
    type = "text",
    ...rest
}) => {
    const inputId = id || name || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block mb-1 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500"
                    } ${inputClassName}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...rest}
            />
            {error && (
                <p
                    id={`${inputId}-error`}
                    className="mt-1 text-xs text-red-600"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;