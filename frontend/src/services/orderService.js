import API from "./api";

const orderService = {
  placeOrder: async (paymentMethod = "COD") => {
    const response = await API.post(`/orders/place-order?paymentMethod=${paymentMethod}`);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await API.get("/orders/my-orders");
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await API.put(`/orders/cancel/${orderId}`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await API.get("/orders/admin/all");
    return response.data;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const response = await API.put(`/orders/admin/status/${orderId}?newStatus=${newStatus}`);
    return response.data;
  }
};

export default orderService;
