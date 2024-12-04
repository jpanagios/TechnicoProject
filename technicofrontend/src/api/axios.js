import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Το URL του backend
    headers: { "Content-Type": "application/json" },
});

// Παράδειγμα interceptors για debugging ή authentication token
api.interceptors.request.use(
    (config) => {
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default api;
