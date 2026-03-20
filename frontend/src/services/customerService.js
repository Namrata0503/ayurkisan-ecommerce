import API from "./api";

export const getCustomerById = (id) =>
  API.get(`/customer/${id}`);

export const updateCustomer = (id, data) =>
  API.put(`/customer/update/${id}`, data);

export const changeCustomerPassword = (id, data) =>
  API.put(`/customer/change-password/${id}`, data);
