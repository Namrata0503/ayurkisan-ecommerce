import API from "./api";

export const addToCart = async (userId, role, itemId, itemType, quantity) => {
  const response = await API.post("/cart/add", null, {
    params: { userId, role, itemId, itemType, quantity }
  });
  return response.data;
};

export const getCart = async (userId, role = "CUSTOMER") => {
  const response = await API.get(`/cart/${userId}`, { params: { role } });
  return response.data;
};

export const updateQuantity = async (userId, itemId, itemType, quantity) => {
  const response = await API.put("/cart/update", null, {
    params: { userId, itemId, itemType, quantity }
  });
  return response.data;
};

export const removeFromCart = async (userId, itemId, itemType) => {
  const response = await API.delete(`/cart/remove/${userId}/${itemId}/${itemType}`);
  return response.data;
};

export const clearCart = async (userId) => {
  const response = await API.delete(`/cart/clear/${userId}`);
  return response.data;
};

export const checkoutCart = async (userId) => {
  const response = await API.post(`/cart/checkout/${userId}`);
  return response.data;
};
