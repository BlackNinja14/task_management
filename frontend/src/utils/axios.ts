import axios from "axios";

const BASE_URL = "http://localhost:3081/api";
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

export default axiosInstance;
