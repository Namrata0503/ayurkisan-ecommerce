import API from "./api";

// Customer Signup
export const customerSignup = (data) =>
  API.post("/api/auth/customer/signup", data);

// Retailer Signup
export const retailerSignup = (data) =>
  API.post("/api/auth/retailer/signup", data);

// Login
export const loginUser = (data) =>
  API.post("/api/auth/login", data);