import API from "./api";

export const customerSignup = (data) =>
  API.post("/auth/customer/signup", data);

export const retailerSignup = (data) =>
  API.post("/auth/retailer/signup", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const adminSignup = (data) =>
  API.post("/auth/admin/register", data);
