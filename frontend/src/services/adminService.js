import API from "./api";
import { adminSignup } from "./authService";

const adminService = {
  getCustomers: async () => {
    const response = await API.get("/admin/customers");
    return response.data;
  },

  recoverCustomer: async (id) => {
    const response = await API.put(`/admin/recover/customer/${id}`);
    return response.data;
  },

  deleteCustomer: async (id) => {
    const response = await API.delete(`/customer/delete/${id}`);
    return response.data;
  },

  getRetailers: async () => {
    const response = await API.get("/admin/retailers");
    return response.data;
  },

  recoverRetailer: async (id) => {
    const response = await API.put(`/admin/recover/retailer/${id}`);
    return response.data;
  },

  deleteRetailer: async (id) => {
    const response = await API.delete(`/retailer/delete/${id}`);
    return response.data;
  },

  getAllAdmins: async () => {
    const response = await API.get("/admin/admins");
    return response.data;
  },

  registerAdmin: adminSignup,

  updateAdmin: async (id, adminData) => {
    const response = await API.put(`/admin/update/${id}`, adminData);
    return response.data;
  },

  deleteAdmin: async (id) => {
    const response = await API.delete(`/admin/delete/${id}`);
    return response.data;
  }
};

export default adminService;
