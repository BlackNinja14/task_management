import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputFIeld";
import ButtonField from "../common/ButtonField";

interface AddTaskProps {
    onClose: () => void;
    onSubmitTask: (data: TaskFormValues) => void;
}

export interface TaskFormValues {
    name: string;
    description: string;
    date: string;
}

const AddTask: React.FC<AddTaskProps> = ({ onClose, onSubmitTask }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormValues>();

    const onSubmit = (data: TaskFormValues) => {
        onSubmitTask(data);
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
                <h3 className="text-2xl font-bold mb-8 text-blue-700 text-center">Add New Task</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Task Name"
                        type="text"
                        {...register("name", { required: "Task name is required" })}
                        error={errors.name?.message}
                        placeholder="Task name"
                        autoFocus
                    />
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium text-gray-700">Description</label>
                        <textarea
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-base ${errors.description
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-400"
                                }`}
                            placeholder="Task description"
                            {...register("description")}
                            rows={3}
                        />
                    </div>
                    <InputField
                        label="Date"
                        type="date"
                        {...register("date", { required: "Date is required" })}
                        error={errors.date?.message}
                    />
                    <div className="flex justify-end space-x-4">
                        <ButtonField
                            type="button"
                            className="w-auto px-8 py-2 text-base"
                            onClick={() => {
                                onClose();
                                reset();
                            }}
                        >
                            Cancel
                        </ButtonField>
                        <ButtonField
                            type="submit"
                            className="w-auto px-8 py-2 text-base bg-blue-600 hover:bg-blue-700"
                            loading={isSubmitting}
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