import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Το URL του backend
  headers: { "Content-Type": "application/json" },
});

export default api;
