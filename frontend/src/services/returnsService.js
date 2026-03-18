import API from "./api";

const returnsService = {
  getAllReturns: async () => {
    const response = await API.get("/api/returns/admin/all");
    return response.data;
  },

  updateReturnStatus: async (orderId, newStatus, remarks = "") => {
    const response = await API.put(
      `/api/returns/admin/status/${orderId}?newStatus=${newStatus}&remarks=${encodeURIComponent(remarks)}`
    );
    return response.data;
  }
};

export default returnsService;
