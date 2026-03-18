import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import adminService from "../../services/adminService";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function ManageUsers() {
  const [activeTab, setActiveTab] = useState("customers");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [actionUser, setActionUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = activeTab === "customers"
        ? await adminService.getCustomers()
        : await adminService.getRetailers();
      setData(result);
    } catch (err) {
      console.error(`Error fetching ${activeTab}`, err);
      setError(`Failed to fetch ${activeTab}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (user) => {
    try {
      if (activeTab === "customers") {
        await adminService.recoverCustomer(user.id);
      } else {
        await adminService.recoverRetailer(user.id);
      }
      toast.success("User recovered successfully.");
      fetchUsers();
    } catch (err) {
      toast.error("Status update failed.");
    }
  };

  const handleDelete = async () => {
    if (!actionUser) {
      return;
    }

    try {
      if (activeTab === "customers") {
        await adminService.deleteCustomer(actionUser.id);
      } else {
        await adminService.deleteRetailer(actionUser.id);
      }
      setActionUser(null);
      toast.success("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  const filteredData = data.filter((user) => {
    const name = activeTab === "customers" ? user.name : user.retailerName;
    return name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage {activeTab === "customers" ? "Customers" : "Retailers"}</h2>
          <span className="admin-count">{data.length} Total Registered {activeTab}</span>
        </div>

        <div className="header-actions" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div className="tab-switcher" style={{ background: "#f3f4f6", padding: "4px", borderRadius: "12px", display: "flex", gap: "4px" }}>
            <button className={`tab-btn ${activeTab === "customers" ? "active" : ""}`} onClick={() => setActiveTab("customers")}>
              Customers
            </button>
            <button className={`tab-btn ${activeTab === "retailers" ? "active" : ""}`} onClick={() => setActiveTab("retailers")}>
              Retailers
            </button>
          </div>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: "250px" }}
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-container">
          <div className="loader"></div>
          <p>Loading {activeTab}...</p>
        </div>
      ) : error ? (
        <div className="admin-error-container">
          <p>{error}</p>
          <button onClick={fetchUsers} className="primary-btn">Retry</button>
        </div>
      ) : (
        <motion.div className="admin-card" variants={itemVariants}>
          <div className="table-wrapper">
            <table className="admin-table gradient-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Contact Info</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <AnimatePresence mode="popLayout">
                <tbody>
                  {filteredData.map((user) => {
                    const displayName = activeTab === "customers" ? user.name : user.retailerName;
                    const deleted = user.delete ?? user.isDelete ?? false;

                    return (
                      <motion.tr
                        key={user.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td>
                          <div className="admin-profile">
                            <div className="admin-avatar">
                              {displayName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="admin-name">{displayName}</div>
                              <div style={{ fontSize: "12px", color: "#6b7280" }}>{user.email}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div style={{ fontWeight: "500", color: "#374151", fontSize: "13px" }}>{user.phoneNumber}</div>
                          <div style={{ fontSize: "11px", color: "#9ca3af", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.address}</div>
                        </td>

                        <td>
                          <span className={`status-badge ${!deleted ? "status-active" : "status-disabled"}`}>
                            {!deleted ? "ACTIVE" : "SOFT DELETED"}
                          </span>
                        </td>

                        <td className="action-buttons">
                          {deleted ? (
                            <button className="edit-btn" onClick={() => handleRecover(user)}>
                              Recover
                            </button>
                          ) : (
                            <button className="delete-btn" onClick={() => setActionUser(user)}>
                              Delete
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
          {filteredData.length === 0 ? <div className="empty-text">No {activeTab} match your search.</div> : null}
        </motion.div>
      )}

      <AnimatePresence>
        {actionUser ? (
          <div className="modal-overlay">
            <motion.div
              className="modal-box confirm-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ maxWidth: "400px", padding: "30px", background: "white", borderRadius: "24px", textAlign: "center" }}
            >
              <h3 style={{ marginBottom: "15px", color: "#dc2626", fontSize: "20px" }}>Remove User?</h3>
              <p style={{ color: "#6b7280", marginBottom: "30px" }}>
                Are you sure you want to soft-delete <strong>{activeTab === "customers" ? actionUser.name : actionUser.retailerName}</strong>?
              </p>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <button className="primary-btn" style={{ background: "#dc2626" }} onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button className="secondary-btn" onClick={() => setActionUser(null)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default ManageUsers;
