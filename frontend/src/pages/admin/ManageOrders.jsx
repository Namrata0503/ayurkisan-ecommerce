import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders", err);
      setError("Failed to load orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      toast.success("Order status updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = order.userName || "Unknown";
    return (
      customerName.toLowerCase().includes(search.toLowerCase()) ||
      (order.id || "").toString().includes(search)
    );
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED": return "status-active";
      case "CANCELLED": return "status-disabled";
      case "SHIPPED": return "status-shipped";
      case "PLACED":
      case "CONFIRMED": return "status-pending";
      default: return "";
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Fetching Orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button onClick={fetchOrders} className="primary-btn">Retry</button>
      </div>
    );
  }

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage Orders</h2>
          <span className="admin-count">{orders.length} Total orders recorded</span>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by ID or customer..."
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: "280px" }}
          />
          <button className="secondary-btn" onClick={fetchOrders}>Refresh</button>
        </div>
      </div>

      <motion.div className="admin-card" variants={itemVariants}>
        <div className="table-wrapper">
          <table className="admin-table gradient-table">
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Current Status</th>
                <th>Quick Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span className="id-badge">#{order.id}</span>
                        <span style={{ fontSize: "11px", color: "#6b7280" }}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : ""}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="admin-profile">
                        <div className="admin-avatar">
                          {(order.userName || "?").charAt(0)}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span className="admin-name">{order.userName || "Guest"}</span>
                          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{order.contactEmail || ""}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span className="price-text" style={{ fontSize: "16px", fontWeight: "700" }}>{formatPrice(order.totalDiscountedPrice)}</span>
                        <span style={{ fontSize: "11px", color: "#10b981" }}>{order.paymentMethod || "COD"}</span>
                      </div>
                    </td>

                    <td>
                      <span className={`status-badge ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td>
                      <select
                        className="search-input"
                        style={{ padding: "6px 12px", width: "145px", fontSize: "13px", background: "#f8fafc" }}
                        value={order.orderStatus}
                        onChange={(event) => handleStatusUpdate(order.id, event.target.value)}
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
        {filteredOrders.length === 0 ? <div className="empty-text">No orders found matching your search.</div> : null}
      </motion.div>
    </motion.div>
  );
}

export default ManageOrders;
