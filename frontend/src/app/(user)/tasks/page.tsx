/*
  This page is responsible for displaying the user's task list.
  It fetches tasks from the backend using the access token from cookies.
  If the user is not authenticated, they are redirected to the login page.
*/

import Login from '@/components/Auth/Login';
import TaskList from '@/components/TaskList/TaskList';
import axiosInstance from '@/utils/axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const Page: React.FC = async () => {
    const cookieStore = await cookies();
    let getTasks;
    try {
        getTasks = await axiosInstance.get('/tasks', { headers: { Authorization: `Bearer ${cookieStore.get('access')?.value}` } });
    }
    catch {
        redirect('/login')
    }
    return (
        <TaskList taskList={getTasks.data.data} />
    );
};

export default Page;
