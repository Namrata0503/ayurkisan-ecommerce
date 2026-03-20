import API from "./api";

const categoryService = {
  getAllCategories: async () => {
    const response = await API.get("/categories/all");
    return response.data;
  },
  
  // ADMIN METHODS
  addCategory: async (categoryData) => {
    const response = await API.post("/categories/admin/add", categoryData);
    return response.data;
  },

  updateCategory: async (oldName, categoryData) => {
    const response = await API.put(`/categories/admin/update/${oldName}`, categoryData);
    return response.data;
  },

  deleteCategory: async (categoryName) => {
    const response = await API.delete(`/categories/admin/delete/${categoryName}`);
    return response.data;
  }
};

export default categoryService;
