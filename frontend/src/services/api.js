import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  withCredentials: false,
  timeout: 10000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      console.error("Backend CORS issue:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
