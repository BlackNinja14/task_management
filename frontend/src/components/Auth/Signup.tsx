'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../common/InputFIeld';
import ButtonField from '../common/ButtonField';
import Link from 'next/link';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

interface ISignupFormValues {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ISignupFormValues>();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ISignupFormValues) => {
            const res = await axiosInstance.post('/auth/register', data);
            return res.data;
        },
        onSuccess: () => {
            setSuccessMessage('Registration successful! Redirecting to login...');
            setServerError(null);
            reset();
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Registration failed. Please try again.';
            setServerError(message);
            setSuccessMessage(null);
        },
    });

    const onSubmit = (data: ISignupFormValues) => {
        setServerError(null);
        setSuccessMessage(null);
        mutate(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            {serverError && (
                <div className="mb-4 text-sm text-red-600 text-center">
                    {serverError}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 text-sm text-green-600 text-center">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    label="Name"
                    type="text"
                    {...register('name', {
                        required: 'Name is required',
                    })}
                    error={errors.name?.message}
                    placeholder="Enter your name"
                />
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
                <ButtonField className="w-full" type="submit" loading={isPending}>
                    Sign Up
                </ButtonField>
            </form>

            <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default Signup;
