import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import shipmentService from "../../services/shipmentService";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function ManageShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const data = await shipmentService.getAllShipments();
      setShipments(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching shipments", err);
      setError("Failed to load shipment data.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await shipmentService.updateShipmentStatus(orderId, newStatus, "");
      setShipments((current) =>
        current.map((shipment) =>
          shipment.orderId === orderId ? { ...shipment, status: newStatus } : shipment
        )
      );
      toast.success("Shipment status updated.");
    } catch (err) {
      console.error("Failed to update shipment", err);
      toast.error(err.response?.data?.message || "Failed to update shipment status.");
    }
  };

  const filteredShipments = shipments.filter((shipment) => {
    const destination = shipment.shippingAddress || "";
    const orderId = shipment.orderId || "";
    return destination.toLowerCase().includes(search.toLowerCase()) || orderId.includes(search);
  });

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Loading Shipment Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button className="primary-btn" onClick={fetchShipments}>Retry</button>
      </div>
    );
  }

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage Shipments</h2>
          <span className="admin-count">{shipments.length} Active Shipments</span>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by order ID or address..."
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: "300px" }}
          />
          <button className="secondary-btn" onClick={fetchShipments}>
            Refresh
          </button>
        </div>
      </div>

      <motion.div className="admin-card" variants={itemVariants}>
        <div className="table-wrapper">
          <table className="admin-table gradient-table">
            <thead>
              <tr>
                <th>Shipment Label</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredShipments.map((shipment) => (
                  <motion.tr
                    key={shipment.id || shipment.orderId}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span className="id-badge">Order #{shipment.orderId}</span>
                        <div style={{ fontSize: "11px", color: "#6b7280" }}>
                          Created {shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString("en-IN") : ""}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "600", color: "#374151" }}>{shipment.contactPhone || "Contact unavailable"}</span>
                        <span
                          style={{ fontSize: "12px", color: "#6b7280", maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                          title={shipment.shippingAddress}
                        >
                          {shipment.shippingAddress || "No address provided"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="status-badge status-shipped" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <span className="pulse-dot"></span>
                        {shipment.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="search-input"
                        style={{ padding: "6px 12px", width: "180px", fontSize: "13px" }}
                        value={shipment.status}
                        onChange={(event) => handleStatusUpdate(shipment.orderId, event.target.value)}
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
        {filteredShipments.length === 0 ? <div className="empty-text">No shipments found.</div> : null}
      </motion.div>
    </motion.div>
  );
}

export default ManageShipments;
