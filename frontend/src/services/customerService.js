import API from "./api";

export const getCustomerById = (id) =>
  API.get(`/api/customer/${id}`);

export const updateCustomer = (id, data) =>
  API.put(`/api/customer/update/${id}`, data);

export const changeCustomerPassword = (id, data) =>
  API.put(`/api/customer/change-password/${id}`, data);
