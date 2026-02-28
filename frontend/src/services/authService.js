import API from "./api";

// Customer Signup
export const customerSignup = (data) =>
  API.post("/auth/customer/signup", data);

// Retailer Signup
export const retailerSignup = (data) =>
  API.post("/auth/retailer/signup", data);

// Login
export const loginUser = (data) =>
  API.post("/auth/login", data);