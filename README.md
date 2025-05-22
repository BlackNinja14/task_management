# Task Management Platform

Welcome to the Task Management Platform! This is a simple, modern web application that helps you organize your daily tasks. You can sign up, log in, and manage your personal to-do list with ease. The project is built with a Next.js frontend and a Node.js/Express backend, using MongoDB for data storage.

## Features
- Secure user authentication (sign up, login, JWT-based auth)
- Add, view, and search your tasks
- Paginated task list for easy navigation
- Clean, responsive UI styled with Tailwind CSS
- Protected API endpoints
- Helpful error messages and feedback

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, react-hook-form, axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT

---

## Environment Variables

Before you get started, you'll need to set up some environment variables for both the backend and frontend. Here are some sample values:

### Backend (`backend/.env`)
```
PORT=3081
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_jwt_secret_here
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3081/api
```

---

## Getting Started

1. **Clone the repository**
2. **Set up your environment variables** as shown above
3. **Install dependencies** in both the `frontend` and `backend` folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. **Start the backend server**:
   ```bash
   cd backend && npm run dev
   ```
5. **Start the frontend app**:
   ```bash
   cd frontend && npm run dev
   ```
6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the app.

7. Open your browser and go to [http://localhost:3081/api-docs](http://localhost:3081/api-docs) to use the swagger, i added this only for auth module now.

---
