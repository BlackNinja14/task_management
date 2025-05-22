/*
  This file sets up a pre-configured axios instance for making HTTP requests to the backend API.
  It automatically attaches credentials, handles base URL configuration, and includes interceptors
  for request and response. If a 401 Unauthorized error is received, it redirects the user to the login page.
*/

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
