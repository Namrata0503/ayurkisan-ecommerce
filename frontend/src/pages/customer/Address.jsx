import { useEffect, useState } from "react";
import { MapPin, Phone, User } from "lucide-react";
import { toast } from "react-toastify";
import { getCustomerById, updateCustomer } from "../../services/customerService";
import "../../styles/dashboard/customerDashboard.css";

function Address() {
  const userId = localStorage.getItem("userId");
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const response = await getCustomerById(userId);
        setForm({
          name: response.data.name || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || "",
          email: response.data.email || ""
        });
      } catch (error) {
        console.error("Failed to load address data:", error);
        toast.error("Unable to load your address details.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadCustomer();
    }
  }, [userId]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateCustomer(userId, {
        name: form.name,
        phoneNumber: form.phoneNumber,
        address: form.address
      });
      toast.success("Address details updated successfully.");
    } catch (error) {
      console.error("Failed to update address:", error);
      toast.error(error.response?.data?.message || "Failed to save address details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="customer-content-inner">Loading address details...</div>;
  }

  return (
    <div className="customer-content-inner">
      <div className="account-page-header">
        <div>
          <h1 className="dashboard-title">Delivery Address</h1>
          <p className="account-page-subtitle">Keep your shipping details up to date for faster checkout.</p>
        </div>
      </div>

      <div className="account-grid medium-grid">
        <div className="premium-section account-summary-card">
          <span className="account-badge">Primary Address</span>
          <h2>{form.name || "Customer"}</h2>
          <div className="account-summary-list">
            <div><MapPin size={16} /> <span>{form.address || "No saved address yet"}</span></div>
            <div><Phone size={16} /> <span>{form.phoneNumber || "No phone number added"}</span></div>
            <div><User size={16} /> <span>{form.email || "No email found"}</span></div>
          </div>
        </div>

        <form className="premium-section account-form-card compact-form" onSubmit={handleSave}>
          <h2>Update Address</h2>

          <div className="profile-form-grid compact-two-col">
            <div className="profile-field">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <input value={form.email} disabled />
          </div>

          <div className="profile-field">
            <label>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <button type="submit" className="update-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Address;
