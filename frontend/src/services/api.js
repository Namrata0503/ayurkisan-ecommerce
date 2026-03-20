import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api",
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
