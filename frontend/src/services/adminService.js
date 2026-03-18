import API from "./api";
import { adminSignup } from "./authService";

const adminService = {
  getCustomers: async () => {
    const response = await API.get("/api/admin/customers");
    return response.data;
  },

  recoverCustomer: async (id) => {
    const response = await API.put(`/api/admin/recover/customer/${id}`);
    return response.data;
  },

  deleteCustomer: async (id) => {
    const response = await API.delete(`/api/customer/delete/${id}`);
    return response.data;
  },

  getRetailers: async () => {
    const response = await API.get("/api/admin/retailers");
    return response.data;
  },

  recoverRetailer: async (id) => {
    const response = await API.put(`/api/admin/recover/retailer/${id}`);
    return response.data;
  },

  deleteRetailer: async (id) => {
    const response = await API.delete(`/api/retailer/delete/${id}`);
    return response.data;
  },

  getAllAdmins: async () => {
    const response = await API.get("/api/admin/admins");
    return response.data;
  },

  registerAdmin: adminSignup,

  updateAdmin: async (id, adminData) => {
    const response = await API.put(`/api/admin/update/${id}`, adminData);
    return response.data;
  },

  deleteAdmin: async (id) => {
    const response = await API.delete(`/api/admin/delete/${id}`);
    return response.data;
  }
};

export default adminService;
