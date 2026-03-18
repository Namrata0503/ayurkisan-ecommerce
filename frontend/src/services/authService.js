import API from "./api";

export const customerSignup = (data) =>
  API.post("/api/auth/customer/signup", data);

export const retailerSignup = (data) =>
  API.post("/api/auth/retailer/signup", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

export const adminSignup = (data) =>
  API.post("/api/auth/admin/register", data);
