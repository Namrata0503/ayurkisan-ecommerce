import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";
import "../../styles/admin.css";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showForm, setShowForm] = useState(false);

  // Temporary fetch (replace with real API later)
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await API.get("/admin/all"); // if backend exists
      setAdmins(res.data);
    } catch (err) {
      console.log("Using dummy data");
      setAdmins([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/admin/register", form);
      alert("Admin added successfully");
      setShowForm(false);
      fetchAdmins();
    } catch (error) {
      alert("Error adding admin");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/${id}`);
      fetchAdmins();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Manage Admins</h1>
          <button onClick={() => setShowForm(true)} className="primary-btn">
            + Add Admin
          </button>
        </div>

        {showForm && (
          <div className="admin-form-card">
            <form onSubmit={handleAddAdmin}>
              <input name="name" placeholder="Name" onChange={handleChange} required />
              <input name="address" placeholder="Address" onChange={handleChange} required />
              <input name="email" placeholder="Email" onChange={handleChange} required />
              <input name="phoneNumber" placeholder="Phone" onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

              <div className="form-actions">
                <button type="submit" className="success-btn">Create</button>
                <button type="button" className="danger-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phoneNumber}</td>
                  <td>
                    <button
                      className="danger-btn"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {admins.length === 0 && (
            <p className="empty-text">No admins found.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageAdmins;