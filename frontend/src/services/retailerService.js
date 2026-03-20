import API from "./api";

export const getRetailerById = (id) =>
  API.get(`/retailer/${id}`);

export const updateRetailer = (id, data) =>
  API.put(`/retailer/update/${id}`, data);

export const changeRetailerPassword = (id, data) =>
  API.put(`/retailer/change-password/${id}`, data);
