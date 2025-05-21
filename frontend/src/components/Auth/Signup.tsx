'use client'
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputFIeld";
import ButtonField from "../common/ButtonField";
import Link from "next/link";

interface SignupFormValues {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>();

    const onSubmit = (data: SignupFormValues) => {
        // Handle signup logic here
        console.log(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    label="Name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                    placeholder="Enter your name"
                />
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
                    Sign Up
                </ButtonField>
            </form>

            <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default Signup;