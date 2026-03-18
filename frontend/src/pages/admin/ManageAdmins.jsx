import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import adminService from "../../services/adminService";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllAdmins();
      setAdmins(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching admins", err);
      setError("Failed to load admins.");
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleAddAdmin = async (event) => {
    event.preventDefault();
    try {
      await adminService.registerAdmin(form);
      setShowModal(false);
      setForm({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      toast.success("Admin registered successfully.");
      fetchAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding admin.");
    }
  };

  const handleDelete = async () => {
    if (!deleteAdmin) {
      return;
    }

    try {
      await adminService.deleteAdmin(deleteAdmin.id);
      setDeleteAdmin(null);
      toast.success("Admin deleted successfully.");
      fetchAdmins();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Fetching Admins...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button onClick={fetchAdmins} className="primary-btn">Retry</button>
      </div>
    );
  }

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage Admins</h2>
          <span className="admin-count">{admins.length} Total Admins</span>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            + Add Admin
          </button>
        </div>
      </div>

      <motion.div className="admin-card" variants={itemVariants}>
        <div className="table-wrapper">
          <table className="admin-table gradient-table">
            <thead>
              <tr>
                <th>Admin Profile</th>
                <th>Contact Info</th>
                <th>Role & Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredAdmins.length > 0 ? (
                  filteredAdmins.map((admin) => (
                    <motion.tr
                      key={admin.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="admin-cell">
                        <div className="admin-profile">
                          <div className="admin-avatar">{admin.name.charAt(0).toUpperCase()}</div>
                          <div>
                            <div className="admin-name">{admin.name}</div>
                            <div className="admin-email" style={{ fontSize: "12px", color: "#6b7280" }}>{admin.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="fw-500">
                        <div style={{ color: "#374151", fontSize: "13px" }}>{admin.phoneNumber}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>{admin.address}</div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span className="role-badge role-admin" style={{ width: "fit-content" }}>ADMIN</span>
                          <span className="status-badge status-active" style={{ width: "fit-content" }}>Active</span>
                        </div>
                      </td>

                      <td className="action-buttons">
                        <button className="delete-btn" onClick={() => setDeleteAdmin(admin)}>
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-text">No admins found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal ? (
          <div className="modal-overlay">
            <motion.div
              className="modal-box premium-modal admin-form"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ maxWidth: "500px", padding: "30px", background: "white", borderRadius: "24px" }}
            >
              <h3 style={{ marginBottom: "20px", color: "#1b4332", fontSize: "22px", fontWeight: "700" }}>Create New Admin</h3>

              <form onSubmit={handleAddAdmin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "500" }}>Full Name</label>
                    <input className="search-input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "500" }}>Email Address</label>
                    <input className="search-input" type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "500" }}>Phone Number</label>
                    <input className="search-input" name="phoneNumber" placeholder="9876543210" value={form.phoneNumber} onChange={handleChange} required />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "500" }}>Password</label>
                    <input className="search-input" type="password" name="password" value={form.password} onChange={handleChange} required />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "500" }}>Office/Home Address</label>
                  <textarea className="search-input" name="address" value={form.address} onChange={handleChange} required style={{ height: "80px", resize: "none" }} />
                </div>

                <div className="modal-actions" style={{ display: "flex", gap: "12px", marginTop: "10px", justifyContent: "flex-end" }}>
                  <button type="submit" className="primary-btn" style={{ minWidth: "130px" }}>Register Admin</button>
                  <button type="button" className="secondary-btn" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {deleteAdmin ? (
          <div className="modal-overlay">
            <motion.div
              className="modal-box confirm-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ maxWidth: "400px", padding: "30px", background: "white", borderRadius: "24px", textAlign: "center" }}
            >
              <h3 style={{ marginBottom: "10px", color: "#dc2626", fontSize: "20px" }}>Remove Admin Access?</h3>
              <p style={{ color: "#666", marginBottom: "25px" }}>
                Are you sure you want to remove <strong>{deleteAdmin.name}</strong> from admin privileges?
              </p>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <button className="primary-btn" style={{ background: "#dc2626" }} onClick={handleDelete}>
                  Yes, Remove
                </button>
                <button className="secondary-btn" onClick={() => setDeleteAdmin(null)}>
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

export default ManageAdmins;
