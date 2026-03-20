import API from "./api";

export const getAllProducts = async () => {
  const response = await API.get("/products/all");
  return response.data;
};

export const getProductByName = async (name) => {
  const response = await API.get(`/products/${encodeURIComponent(name)}`);
  return response.data;
};

export const getProductById = async (id) => {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) || null;
};

export const addProduct = async (productData) => {
  const response = await API.post("/products/admin/add", productData);
  return response.data;
};

export const updateProduct = async (oldName, productData) => {
  const response = await API.put(
    `/products/admin/update/${encodeURIComponent(oldName)}`,
    productData
  );
  return response.data;
};

export const deleteProduct = async (productName) => {
  const response = await API.delete(
    `/products/admin/delete/${encodeURIComponent(productName)}`
  );
  return response.data;
};

const productService = {
  getAllProducts,
  getProductByName,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};

export default productService;
