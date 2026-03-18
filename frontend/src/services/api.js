import axios from "axios";

const API = axios.create({
  // Keep all browser requests on localhost:5173 and send them through Vite's proxy.
  baseURL: import.meta.env.VITE_API_BASE_URL || "/",
  timeout: 10000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
