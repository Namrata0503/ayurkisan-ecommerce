import API from "./api";

export const addFeedback = async (feedback) => {
  const response = await API.post("/api/feedbacks/add", feedback);
  return response.data;
};

export const getProductFeedback = async (productId) => {
  const response = await API.get(`/api/feedbacks/product/${productId}`);
  return response.data;
};

export const getUserFeedback = async (userId) => {
  const response = await API.get(`/api/feedbacks/user/${userId}`);
  return response.data;
};

export const getAllFeedback = async () => {
  const response = await API.get("/api/feedbacks/admin/all");
  return response.data;
};
