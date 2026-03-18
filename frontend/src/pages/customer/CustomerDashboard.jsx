import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock3, MapPin, PackageCheck, ShoppingBag, ShoppingCart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCart } from "../../services/cartService";
import { getCustomerById } from "../../services/customerService";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/customerDashboard.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function CustomerDashboard() {
  const { user } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.userId) {
        return;
      }

      try {
        setLoading(true);
        const [profile, ordersList, cart] = await Promise.all([
          getCustomerById(user.userId),
          orderService.getMyOrders(),
          getCart(user.userId, user.role)
        ]);

        setCustomer(profile.data);
        setOrders(ordersList);
        setCartCount((cart.items || []).reduce((sum, item) => sum + item.quantity, 0));
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const activeOrders = orders.filter((order) =>
    ["PLACED", "CONFIRMED", "SHIPPED"].includes((order.orderStatus || "").toUpperCase())
  );

  const deliveredOrders = orders.filter(
    (order) => (order.orderStatus || "").toUpperCase() === "DELIVERED"
  );

  const totalSpend = orders.reduce(
    (sum, order) => sum + Number(order.totalDiscountedPrice || 0),
    0
  );

  const latestOrder = orders[0] || null;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      detail: "All purchases from your account",
      icon: ShoppingBag,
      tone: "orders-icon"
    },
    {
      title: "Active Orders",
      value: activeOrders.length,
      detail: "Currently moving through fulfilment",
      icon: Clock3,
      tone: "wishlist-icon"
    },
    {
      title: "Cart Items",
      value: cartCount,
      detail: "Ready for checkout",
      icon: ShoppingCart,
      tone: "cart-icon"
    },
    {
      title: "Total Spend",
      value: formatPrice(totalSpend),
      detail: "Lifetime order value",
      icon: Wallet,
      tone: "address-icon"
    }
  ];

  return (
    <motion.div className="customer-content-inner" variants={containerVariants} initial="hidden" animate="show">
      <motion.div className="dashboard-hero" variants={itemVariants}>
        <div className="hero-content">
          <span className="hero-eyebrow">Customer Dashboard</span>
          <h1 className="hero-title">Welcome Back, <span className="text-highlight">{customer?.name || "Customer"}</span></h1>
          <p className="hero-subtitle">Track orders, monitor spending, and manage your AyurKisan profile in one place.</p>
        </div>
        <div className="hero-action dashboard-hero-panel">
          <div className="hero-badge-row">
            <span>{deliveredOrders.length} delivered</span>
            <span>{activeOrders.length} in progress</span>
          </div>
          <p>{latestOrder ? `Latest order: #${latestOrder.id.slice(-6).toUpperCase()}` : "No orders yet. Start with our herbal collection."}</p>
          <div className="hero-action-links">
            <Link to="/products" className="btn-primary">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/customer/orders" className="btn-secondary">
              View Orders
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div className="dashboard-cards" variants={containerVariants}>
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div className="card glass-card dashboard-stat-card" variants={itemVariants} key={item.title}>
              <div className={`card-icon-wrapper ${item.tone}`}>
                <Icon size={22} />
              </div>
              <div className="card-info">
                <h3>{item.title}</h3>
                <p className="gradient-text">{item.value}</p>
                <span className="card-caption">{item.detail}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="dashboard-lower-grid" variants={containerVariants}>
        <motion.div className="premium-section customer-profile-panel" variants={itemVariants}>
          <div className="section-header">
            <h2>Profile Snapshot</h2>
            <Link to="/customer/profile" className="view-all-link">Manage Profile</Link>
          </div>

          <div className="profile-grid">
            <div className="profile-tile">
              <span className="profile-label">Customer Name</span>
              <strong>{customer?.name || "Not available"}</strong>
            </div>
            <div className="profile-tile">
              <span className="profile-label">Email</span>
              <strong>{customer?.email || "Not available"}</strong>
            </div>
            <div className="profile-tile">
              <span className="profile-label">Phone</span>
              <strong>{customer?.phoneNumber || "Not available"}</strong>
            </div>
            <div className="profile-tile">
              <span className="profile-label">Saved Address</span>
              <strong>{customer?.address || "No address added"}</strong>
            </div>
            <div className="profile-tile">
              <span className="profile-label">Account Role</span>
              <strong>{customer?.role || "CUSTOMER"}</strong>
            </div>
            <div className="profile-tile">
              <span className="profile-label">Customer ID</span>
              <strong>{customer?.id ? `#${customer.id.slice(-8).toUpperCase()}` : "Not available"}</strong>
            </div>
          </div>

          <div className="dashboard-mini-actions">
            <Link to="/cart" className="dashboard-mini-btn">Open Cart</Link>
            <Link to="/track-order" className="dashboard-mini-btn">Track Order</Link>
            <Link to="/customer/address" className="dashboard-mini-btn">Manage Address</Link>
            <Link to="/feedback" className="dashboard-mini-btn">Write Feedback</Link>
          </div>
        </motion.div>

        <motion.div className="premium-section customer-highlight-panel" variants={itemVariants}>
          <div className="section-header">
            <h2>Account Highlights</h2>
          </div>

          <div className="highlight-stack">
            <div className="highlight-card">
              <PackageCheck size={20} />
              <div>
                <strong>{deliveredOrders.length} successful deliveries</strong>
                <p>Your completed purchases are recorded here for quick reordering.</p>
              </div>
            </div>
            <div className="highlight-card">
              <Clock3 size={20} />
              <div>
                <strong>{activeOrders.length} orders in progress</strong>
                <p>Stay updated with shipment flow and recent order status changes.</p>
              </div>
            </div>
            <div className="highlight-card">
              <MapPin size={20} />
              <div>
                <strong>Primary delivery location saved</strong>
                <p>{customer?.address || "Add an address from your profile to speed up checkout."}</p>
              </div>
            </div>
            <div className="highlight-card">
              <BadgeCheck size={20} />
              <div>
                <strong>Registered account details synced</strong>
                <p>Your profile, contact number, and delivery address are loaded directly from the backend customer record.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="recent-orders premium-section" variants={itemVariants}>
        <div className="section-header">
          <h2>Recent Orders</h2>
          <Link to="/customer/orders" className="view-all-link">View All</Link>
        </div>

        <div className="table-responsive">
          <table className="gradient-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id.slice(-6).toUpperCase()}</td>
                    <td>{order.items?.[0]?.productName} {order.items?.length > 1 ? `(+${order.items.length - 1} more)` : ""}</td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "-"}</td>
                    <td><span className={`status-pill ${(order.orderStatus || "").toLowerCase()}`}>{order.orderStatus}</span></td>
                    <td>{formatPrice(order.totalDiscountedPrice)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "rgba(255,255,255,0.5)" }}>
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CustomerDashboard;
