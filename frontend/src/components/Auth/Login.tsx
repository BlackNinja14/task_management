/*
  This component handles the login functionality for the Task Management Platform.
  It provides a form for users to enter their email and password, validates input,
  and submits the credentials to the backend. On successful login, the user is redirected
  to the tasks page. If login fails, an error message is shown.
*/
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../common/InputFIeld';
import ButtonField from '../common/ButtonField';
import Link from 'next/link';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useMutation } from '@tanstack/react-query';

interface ILoginFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormValues>();

    const loginMutation = useMutation({
        mutationFn: async (data: ILoginFormValues) => {
            const response = await axiosInstance.post('/auth/login', data);
            return response.data;
        },
        onSuccess: (data) => {
            setCookie('access', data.user.token, {
                maxAge: 60 * 60 * 24,
                path: '/',
            });

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.user.token}`;
            router.push('/tasks');
        },
        onError: (error: any) => {
            console.error('Login Error:', error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Login failed. Please try again later.';
            setServerError(message);
        },
    });

    const onSubmit = (data: ILoginFormValues) => {
        setServerError(null);
        loginMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {serverError && (
                <div className="mb-4 text-sm text-red-600 text-center">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    label="Email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Enter a valid email address',
                        },
                    })}
                    error={errors.email?.message}
                    placeholder="Enter your email"
                />
                <InputField
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                    error={errors.password?.message}
                    placeholder="Enter your password"
                />
                <ButtonField
                    className="w-full"
                    type="submit"
                    loading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                >
                    Login
                </ButtonField>
            </form>

            <div className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;
