/*
  This component provides a modal form for adding a new task in the Task Management Platform.
  It uses react-hook-form for validation, and react-query for the API call.
  On success, it updates the parent list and closes the modal.
*/

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../common/InputFIeld';
import ButtonField from '../common/ButtonField';
import axiosInstance from '@/utils/axios';
import { getCookie } from 'cookies-next';
import { useMutation } from '@tanstack/react-query';

interface AddTaskProps {
    onClose: () => void;
    onSubmitTask: (data: TaskFormValues) => void;
}

export interface TaskFormValues {
    name: string;
    description: string;
    date: string;
    _id?: string;
}

const AddTask: React.FC<AddTaskProps> = ({ onClose, onSubmitTask }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormValues>();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: TaskFormValues) => {
            const response = await axiosInstance.post('/tasks', data, {
                headers: { Authorization: `Bearer ${getCookie('access')}` },
            });
            return response.data.data;
        },
        onSuccess: (newTask) => {
            if (newTask?._id) {
                onSubmitTask(newTask);
                setSuccessMessage('Task added successfully!');
                reset();

                setTimeout(() => {
                    onClose();
                }, 1000);
            }
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Failed to add task. Please try again.';
            setServerError(message);
        },
    });

    const onSubmit = (data: TaskFormValues) => {
        setServerError(null);
        setSuccessMessage(null);
        mutate(data);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
                <h3 className="text-2xl font-bold mb-8 text-blue-700 text-center">Add New Task</h3>

                {serverError && (
                    <div className="mb-4 text-sm text-red-600 text-center">{serverError}</div>
                )}

                {successMessage && (
                    <div className="mb-4 text-sm text-green-600 text-center">{successMessage}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <InputField
                        label="Task Name"
                        type="text"
                        {...register('name', { required: 'Task name is required' })}
                        error={errors.name?.message}
                        placeholder="Task name"
                        autoFocus
                    />

                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium text-gray-700">Description</label>
                        <textarea
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-base ${errors.description
                                ? 'border-red-500 focus:ring-red-400'
                                : 'focus:ring-blue-400'
                                }`}
                            placeholder="Task description"
                            {...register('description')}
                            rows={3}
                        />
                    </div>

                    <InputField
                        label="Date"
                        type="date"
                        {...register('date', { required: 'Date is required' })}
                        error={errors.date?.message}
                    />

                    <div className="flex justify-end space-x-4 mt-6">
                        <ButtonField
                            type="button"
                            className="w-auto px-8 py-2 text-base"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            disabled={isPending}
                        >
                            Cancel
                        </ButtonField>
                        <ButtonField
                            type="submit"
                            className="w-auto px-8 py-2 text-base bg-blue-600 hover:bg-blue-700"
                            loading={isPending}
                        >
                            Add
                        </ButtonField>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
