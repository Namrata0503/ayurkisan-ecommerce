import { useEffect, useState } from "react";
import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { getCustomerById, updateCustomer } from "../../services/customerService";
import "../../styles/dashboard/customerDashboard.css";

function Profile() {
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getCustomerById(userId);
        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || ""
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const handleChange = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateCustomer(userId, {
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        address: profile.address
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="customer-content-inner">Loading profile...</div>;
  }

  return (
    <div className="customer-content-inner">
      <div className="account-page-header">
        <div>
          <h1 className="dashboard-title">My Profile</h1>
          <p className="account-page-subtitle">Manage the customer account details you provided during registration.</p>
        </div>
      </div>

      <div className="account-grid medium-grid">
        <div className="premium-section account-summary-card">
          <div className="profile-avatar medium-avatar">
            <UserRound size={42} />
          </div>
          <h2>{profile.name || "Customer"}</h2>
          <span className="account-badge">Customer Account</span>

          <div className="account-summary-list">
            <div><Mail size={16} /> <span>{profile.email}</span></div>
            <div><Phone size={16} /> <span>{profile.phoneNumber || "No phone saved"}</span></div>
            <div><ShieldCheck size={16} /> <span>JWT protected customer access</span></div>
          </div>
        </div>

        <form className="premium-section account-form-card compact-form" onSubmit={handleUpdate}>
          <h2>Update Profile</h2>

          <div className="profile-form-grid compact-two-col">
            <div className="profile-field">
              <label>Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} required />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <input type="text" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <input type="email" value={profile.email} disabled />
          </div>

          <div className="profile-field">
            <label>Address</label>
            <textarea name="address" rows="4" value={profile.address} onChange={handleChange} required />
          </div>

          <button className="update-btn" type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
