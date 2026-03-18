import API from "./api";

const shipmentService = {
  trackOrder: async (orderId) => {
    const response = await API.get(`/api/shipments/track/${orderId}`);
    return response.data;
  },

  getAllShipments: async () => {
    const response = await API.get("/api/shipments/admin/all");
    return response.data;
  },

  updateShipmentStatus: async (orderId, newStatus, remarks = "") => {
    const response = await API.put(
      `/api/shipments/admin/status/${orderId}?newStatus=${newStatus}&remarks=${encodeURIComponent(remarks)}`
    );
    return response.data;
  }
};

export default shipmentService;
