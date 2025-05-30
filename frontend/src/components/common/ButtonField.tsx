/*
  This is a reusable button component for the Task Management Platform.
  It supports loading states, custom classes, and is styled with Tailwind CSS.
  Use this component throughout the app for consistent button UI and behavior.
*/

import React from "react";

interface ButtonFieldProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const ButtonField: React.FC<ButtonFieldProps> = ({
  children,
  className = "",
  loading = false,
  disabled,
  ...rest
}) => (
  <button
    className={`cursor-pointer py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-4 disabled:opacity-60 ${className}`}
    disabled={disabled || loading}
    {...rest}
  >
    {loading ? "Loading..." : children}
  </button>
);

export default ButtonField;