import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, ClipboardList, MapPin, Phone, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import orderService from "../../services/orderService";
import { getRetailerById, updateRetailer } from "../../services/retailerService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/retailerDashboard.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

function RetailerDashboard() {
  const { user } = useAuth();
  const [retailer, setRetailer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    retailerName: "",
    firmName: "",
    phoneNumber: "",
    address: "",
    email: "",
    registrationId: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user?.userId) {
          return;
        }

        const [profileResponse, ordersResponse] = await Promise.all([
          getRetailerById(user.userId),
          orderService.getMyOrders()
        ]);

        const profile = profileResponse.data;
        setRetailer(profile);
        setOrders(ordersResponse);
        setForm({
          retailerName: profile.retailerName || "",
          firmName: profile.firmName || "",
          phoneNumber: profile.phoneNumber || "",
          address: profile.address || "",
          email: profile.email || "",
          registrationId: profile.registrationId || ""
        });
      } catch (error) {
        console.error("Error fetching retailer dashboard:", error);
        toast.error("Unable to load retailer profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateRetailer(user.userId, {
        retailerName: form.retailerName,
        firmName: form.firmName,
        phoneNumber: form.phoneNumber,
        address: form.address
      });
      setRetailer((current) => ({ ...current, ...form }));
      toast.success("Retailer profile updated successfully.");
    } catch (error) {
      console.error("Retailer update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update retailer profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading Retailer Dashboard...</p>
      </div>
    );
  }

  const pendingOrders = orders.filter((order) =>
    ["PLACED", "CONFIRMED", "SHIPPED"].includes((order.orderStatus || "").toUpperCase())
  );
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalDiscountedPrice || 0), 0);

  return (
    <motion.div className="retailer-content-inner compact-retailer" variants={containerVariants} initial="hidden" animate="show">
      <motion.div className="retailer-hero compact-hero" variants={itemVariants}>
        <div>
          <span className="retailer-hero-tag">Retailer Account</span>
          <h1 className="dashboard-title">{retailer?.firmName || "Retailer"} Dashboard</h1>
          <p className="retailer-hero-copy">
            Manage the business details submitted during registration and monitor your live order activity.
          </p>
        </div>
        <div className="retailer-hero-highlights">
          <div><strong>{orders.length}</strong><span>Total Orders</span></div>
          <div><strong>{pendingOrders.length}</strong><span>In Progress</span></div>
          <div><strong>{formatPrice(totalRevenue)}</strong><span>Revenue</span></div>
        </div>
      </motion.div>

      <motion.div className="retailer-cards compact-cards" variants={containerVariants}>
        <motion.div className="card glass-card compact-stat-card" variants={itemVariants}>
          <Building2 size={20} />
          <h3>Firm Name</h3>
          <p className="compact-value">{retailer?.firmName || "Not set"}</p>
        </motion.div>

        <motion.div className="card glass-card compact-stat-card" variants={itemVariants}>
          <ShoppingBag size={20} />
          <h3>Total Orders</h3>
          <p className="compact-value">{orders.length}</p>
        </motion.div>

        <motion.div className="card glass-card compact-stat-card" variants={itemVariants}>
          <ClipboardList size={20} />
          <h3>Registration ID</h3>
          <p className="compact-value">{retailer?.registrationId || "Not available"}</p>
        </motion.div>

        <motion.div className="card glass-card compact-stat-card" variants={itemVariants}>
          <MapPin size={20} />
          <h3>Business Address</h3>
          <p className="compact-small">{retailer?.address || "No address added"}</p>
        </motion.div>
      </motion.div>

      <motion.div className="retailer-dashboard-grid" variants={containerVariants}>
        <motion.div className="premium-section compact-panel" variants={itemVariants}>
          <div className="section-header">
            <h2>Business Profile</h2>
          </div>
          <form className="retailer-profile-form" onSubmit={handleSave}>
            <div className="retailer-form-grid">
              <div className="retailer-field">
                <label>Retailer Name</label>
                <input name="retailerName" value={form.retailerName} onChange={handleChange} required />
              </div>
              <div className="retailer-field">
                <label>Firm Name</label>
                <input name="firmName" value={form.firmName} onChange={handleChange} required />
              </div>
              <div className="retailer-field">
                <label>Phone Number</label>
                <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
              </div>
              <div className="retailer-field">
                <label>Email</label>
                <input value={form.email} disabled />
              </div>
            </div>

            <div className="retailer-field">
              <label>Registration ID</label>
              <input value={form.registrationId} disabled />
            </div>

            <div className="retailer-field">
              <label>Business Address</label>
              <textarea name="address" rows="4" value={form.address} onChange={handleChange} required />
            </div>

            <button className="update-btn compact-update-btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Business Details"}
            </button>
          </form>
        </motion.div>

        <motion.div className="premium-section compact-panel" variants={itemVariants}>
          <div className="section-header">
            <h2>Registered Information</h2>
          </div>

            <div className="retailer-summary-list">
            <div><strong className="retailer-summary-heading">Registration Snapshot</strong></div>
            <div><Building2 size={16} /><span>{retailer?.firmName}</span></div>
            <div><Phone size={16} /><span>{retailer?.phoneNumber}</span></div>
            <div><MapPin size={16} /><span>{retailer?.address}</span></div>
            <div><ClipboardList size={16} /><span>{retailer?.registrationId}</span></div>
            <div><ShoppingBag size={16} /><span>{retailer?.email}</span></div>
          </div>

          <div className="retailer-mini-orders">
            <h3>Recent Orders</h3>
            {orders.length > 0 ? (
              orders.slice(0, 4).map((order) => (
                <div key={order.id} className="retailer-order-snippet">
                  <div>
                    <strong>#{order.id.slice(-6).toUpperCase()}</strong>
                    <p>{order.items?.[0]?.productName || "Order item"}</p>
                  </div>
                  <div className="retailer-order-meta">
                    <span>{order.orderStatus}</span>
                    <strong>{formatPrice(order.totalDiscountedPrice)}</strong>
                  </div>
                </div>
              ))
            ) : (
              <p className="compact-empty">No recent orders found yet.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default RetailerDashboard;
