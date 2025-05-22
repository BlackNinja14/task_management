/*
  This component handles user registration for the Task Management Platform.
  It provides a form for users to sign up with their name, email, and password.
  On successful registration, the user is redirected to the login page.
  Validation and error handling are included for a smooth user experience.
*/
'use client'
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputFIeld";
import ButtonField from "../common/ButtonField";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";


interface ISignupFormValues {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ISignupFormValues>();

    const onSubmit = async (data: ISignupFormValues) => {
        try {
            const res = await axiosInstance.post("/auth/register", data);
            alert("Registration successful! Please log in.");
            router.push("/login");
        } catch (error: any) {
            console.error("Registration Error:", error);
        }
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