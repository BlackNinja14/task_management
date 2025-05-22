'use client';
import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import ButtonField from "../common/ButtonField";
import AddTask, { TaskFormValues } from "./AddTask";
import { getCookie } from "cookies-next";

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
}
interface ITaskList {
  tasks: Task[];
  total: number;
  page: number;
  pages: number;
}

const TaskList = ({ taskList }: { taskList: ITaskList }) => {
  const [tasks, setTasks] = useState<Task[]>(taskList.tasks);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(taskList?.page);
  const [totalPages, setTotalPages] = useState(taskList?.pages);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = (data: TaskFormValues) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: data.name.trim(),
        description: data.description.trim(),
        date: data.date,
      },
    ]);
  };

  const fetchTasks = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/tasks", {
        headers: { Authorization: `Bearer ${getCookie('access')}` },
        params: {
          page: pageNum,
          limit: 10,
          search,
        },
      });
      setTasks(res.data.tasks);
      setPage(res.data.page);
      setTotalPages(res.data.pages);
    } catch (error) {
      // Optionally handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full py-6 px-8 bg-white shadow-md flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
          Task Management
        </h1>
        <ButtonField
          type="button"
          className="w-auto px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
          onClick={() => setShowAdd(true)}
        >
          + Add Task
        </ButtonField>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 w-full">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-6 sm:p-10">
          {/* Search Bar */}
          <div className="flex justify-end mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full sm:w-80 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* No tasks */}
          {tasks.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-80">
              <p className="mb-4 text-lg text-gray-500 font-medium">
                No tasks found.
              </p>
              <ButtonField
                type="button"
                className="w-auto px-6 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow"
                onClick={() => setShowAdd(true)}
              >
                + Add Task
              </ButtonField>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center h-40 text-blue-600 font-semibold">Loading...</div>
          ) : (
            <>
              {/* Task Table */}
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full bg-white border text-sm text-left">
                  <thead>
                    <tr className="bg-blue-100 text-blue-700 text-sm font-semibold">
                      <th className="py-4 px-6 border-b">Name</th>
                      <th className="py-4 px-6 border-b">Description</th>
                      <th className="py-4 px-6 border-b">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-blue-50 transition">
                        <td className="py-4 px-6 border-b font-medium text-gray-800">{task.name}</td>
                        <td className="py-4 px-6 border-b text-gray-600">
                          {task.description || (
                            <span className="italic text-gray-400">No description</span>
                          )}
                        </td>
                        <td className="py-4 px-6 border-b text-gray-700">{task.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <ButtonField
                  type="button"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow disabled:opacity-50"
                  onClick={() => fetchTasks(page - 1)}
                  disabled={page === 1 || isLoading}
                >
                  Previous
                </ButtonField>
                <span className="text-gray-700 text-sm font-medium">
                  Page {page} of {totalPages || 1}
                </span>
                <ButtonField
                  type="button"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow disabled:opacity-50"
                  onClick={() => fetchTasks(page + 1)}
                  disabled={page === totalPages || totalPages === 0 || isLoading}
                >
                  Next
                </ButtonField>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Add Task Modal */}
      {showAdd && (
        <AddTask
          onClose={() => setShowAdd(false)}
          onSubmitTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskList;
