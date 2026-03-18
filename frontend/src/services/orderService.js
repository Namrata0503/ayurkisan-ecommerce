import API from "./api";

const orderService = {
  placeOrder: async (paymentMethod = "COD") => {
    const response = await API.post(`/api/orders/place-order?paymentMethod=${paymentMethod}`);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await API.get("/api/orders/my-orders");
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await API.put(`/api/orders/cancel/${orderId}`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await API.get("/api/orders/admin/all");
    return response.data;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const response = await API.put(`/api/orders/admin/status/${orderId}?newStatus=${newStatus}`);
    return response.data;
  }
};

export default orderService;
