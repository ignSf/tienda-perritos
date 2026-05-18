/**
 * Axios configuration for API calls
 */

import axios from 'axios';

const API_BASE_URL = `http://${window.location.hostname}:8080/api`;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.token) {
                config.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
