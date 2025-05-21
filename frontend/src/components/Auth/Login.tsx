'use client'
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputFIeld";
import ButtonField from "../common/ButtonField";
import Link from "next/link";

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>();

    const onSubmit = (data: LoginFormValues) => {
        // Handle login logic here
        console.log(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    label="Email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                    error={errors.email?.message}
                    placeholder="Enter your email"
                />
                <InputField
                    label="Password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    error={errors.password?.message}
                    placeholder="Enter your password"
                />
                <ButtonField className="w-full " type="submit" loading={isSubmitting}>
                    Login
                </ButtonField>
            </form>
            <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;