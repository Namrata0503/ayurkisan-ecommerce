import API from "./api";

export const getRetailerById = (id) =>
  API.get(`/api/retailer/${id}`);

export const updateRetailer = (id, data) =>
  API.put(`/api/retailer/update/${id}`, data);

export const changeRetailerPassword = (id, data) =>
  API.put(`/api/retailer/change-password/${id}`, data);
