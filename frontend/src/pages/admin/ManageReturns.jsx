import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import returnsService from "../../services/returnsService";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function ManageReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const data = await returnsService.getAllReturns();
      setReturns(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching returns", err);
      setError("Failed to load return data.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await returnsService.updateReturnStatus(orderId, newStatus, "");
      setReturns((current) =>
        current.map((item) =>
          item.orderId === orderId ? { ...item, status: newStatus } : item
        )
      );
      toast.success("Return status updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed.");
    }
  };

  const filteredReturns = returns.filter((item) => {
    const orderId = (item.orderId || "").toString();
    return item.userId?.toLowerCase().includes(search.toLowerCase()) || orderId.includes(search);
  });

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Loading Return Requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button onClick={fetchReturns} className="primary-btn">Retry</button>
      </div>
    );
  }

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage Returns & Refunds</h2>
          <span className="admin-count">{returns.length} Active Requests</span>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by user or order ID..."
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: "320px" }}
          />
          <button className="secondary-btn" onClick={fetchReturns}>Refresh</button>
        </div>
      </div>

      <motion.div className="admin-card" variants={itemVariants}>
        <div className="table-wrapper">
          <table className="admin-table gradient-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Requester</th>
                <th>Reason / Note</th>
                <th>Resolution Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredReturns.map((item) => (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span className="id-badge">Order #{item.orderId}</span>
                        <span style={{ fontSize: "11px", color: "#6b7280" }}>
                          Created: {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : ""}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="admin-profile">
                        <div className="admin-avatar">{(item.userId || "U").charAt(0)}</div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span className="admin-name">{item.userId}</span>
                          <span style={{ fontSize: "11px", color: "#9ca3af" }}>{item.role}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: "13px", color: "#4b5563", maxWidth: "220px" }}>
                        <div>{item.reason}</div>
                        <span style={{ fontStyle: "italic", color: "#9ca3af" }}>{item.comments || "No extra comments"}</span>
                      </div>
                    </td>

                    <td>
                      <span className={`status-badge ${item.status === "REFUNDED" ? "status-active" : item.status === "REJECTED" ? "status-disabled" : "status-pending"}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="search-input"
                        style={{ padding: "6px 12px", width: "150px", fontSize: "13px" }}
                        value={item.status}
                        onChange={(event) => handleStatusUpdate(item.orderId, event.target.value)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="PICKED_UP">PICKED_UP</option>
                        <option value="REFUNDED">REFUNDED</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
        {filteredReturns.length === 0 ? <div className="empty-text">No return or refund requests found.</div> : null}
      </motion.div>
    </motion.div>
  );
}

export default ManageReturns;
