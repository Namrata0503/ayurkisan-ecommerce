import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AlertTriangle, Boxes, CircleDollarSign, ClipboardList, PackageCheck, RefreshCw, ShoppingBag, Truck, Users } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import adminDashboardService from "../../services/adminDashboardService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/admin.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashboardData = await adminDashboardService.getDashboardStats();
        setData(dashboardData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError("Could not load dashboard information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="view-btn">Retry</button>
      </div>
    );
  }

  const {
    customers,
    retailers,
    products,
    orders,
    allOrders,
    categories,
    recentOrders,
    activeCustomers,
    activeRetailers,
    deliveredOrders,
    pendingOrders,
    cancelledOrders,
    revenue,
    lowStockProducts,
    returnsCount,
    pendingReturns,
    shipmentsCount,
    inTransitShipments
  } = data;

  const buildMonthlyOrderSeries = () => {
    const now = new Date();
    const months = [...Array(6)].map((_, index) => {
      const current = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
      return {
        key,
        label: current.toLocaleString("en-IN", { month: "short" })
      };
    });

    const values = months.map(({ key }) =>
      allOrders.filter((order) => {
        if (!order.createdAt) {
          return false;
        }
        const createdAt = new Date(order.createdAt);
        const orderKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;
        return orderKey === key;
      }).length
    );

    return {
      labels: months.map((item) => item.label),
      values
    };
  };

  const monthlySeries = buildMonthlyOrderSeries();

  const stats = [
    {
      title: "Platform Revenue",
      value: formatPrice(revenue),
      detail: `${deliveredOrders} delivered orders`,
      icon: CircleDollarSign
    },
    {
      title: "Total Orders",
      value: orders,
      detail: `${pendingOrders} active, ${cancelledOrders} cancelled`,
      icon: ShoppingBag
    },
    {
      title: "Active Users",
      value: activeCustomers + activeRetailers,
      detail: `${activeCustomers} customers, ${activeRetailers} retailers`,
      icon: Users
    },
    {
      title: "Inventory",
      value: products,
      detail: `${categories} categories, ${lowStockProducts.length} low stock`,
      icon: Boxes
    }
  ];

  const chartData = {
    labels: monthlySeries.labels,
    datasets: [
      {
        label: "Orders",
        data: monthlySeries.values,
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46,125,50,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  return (
    <motion.div className="admin-dashboard" variants={containerVariants} initial="hidden" animate="show">
      <motion.div className="admin-hero premium-section" variants={itemVariants}>
        <div>
          <span className="admin-kicker">Operations Overview</span>
          <h1 className="admin-hero-title">AyurKisan Admin Dashboard</h1>
          <p className="admin-hero-copy">
            Monitor customers, retailers, product inventory, orders, returns, and shipments from one backend-driven control center.
          </p>
        </div>

        <div className="admin-hero-metrics">
          <div>
            <strong>{customers + retailers}</strong>
            <span>Total registered users</span>
          </div>
          <div>
            <strong>{shipmentsCount}</strong>
            <span>Shipment records</span>
          </div>
          <div>
            <strong>{returnsCount}</strong>
            <span>Return requests</span>
          </div>
        </div>
      </motion.div>

      <motion.div className="dashboard-grid" variants={containerVariants}>
        {stats.map((item) => (
          <motion.div key={item.title} className="dashboard-card premium-card" variants={itemVariants}>
            <div className="dashboard-card-head">
              <div className="admin-stat-icon">
                <item.icon size={18} />
              </div>
              <h4>{item.title}</h4>
            </div>
            <h2>{item.value}</h2>
            <p className="dashboard-card-caption">{item.detail}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="admin-insights-grid" variants={containerVariants}>
        <motion.div className="dashboard-chart premium-section" variants={itemVariants}>
          <div className="admin-section-head">
            <div>
              <h3>Order Trend</h3>
              <p>Last six months of backend order activity</p>
            </div>
          </div>
          <Line data={chartData} />
        </motion.div>

        <motion.div className="premium-section admin-side-panel" variants={itemVariants}>
          <div className="admin-section-head">
            <div>
              <h3>Operational Health</h3>
              <p>Live summary from orders, returns, and shipments</p>
            </div>
          </div>

          <div className="ops-list">
            <div className="ops-item">
              <div className="ops-icon"><PackageCheck size={16} /></div>
              <div>
                <strong>{deliveredOrders} orders completed</strong>
                <p>Delivered orders successfully closed.</p>
              </div>
            </div>
            <div className="ops-item">
              <div className="ops-icon"><Truck size={16} /></div>
              <div>
                <strong>{inTransitShipments} shipments in transit</strong>
                <p>Confirmed, shipped, or out for delivery.</p>
              </div>
            </div>
            <div className="ops-item">
              <div className="ops-icon"><RefreshCw size={16} /></div>
              <div>
                <strong>{pendingReturns} pending returns</strong>
                <p>Return requests awaiting admin action.</p>
              </div>
            </div>
            <div className="ops-item">
              <div className="ops-icon"><Users size={16} /></div>
              <div>
                <strong>{customers + retailers}</strong>
                <p>{customers} customers and {retailers} retailers registered.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="admin-insights-grid admin-lower-grid" variants={containerVariants}>
        <motion.div className="premium-section admin-side-panel" variants={itemVariants}>
          <div className="admin-section-head">
            <div>
              <h3>Inventory Watch</h3>
              <p>Products that may need restocking soon</p>
            </div>
          </div>

          {lowStockProducts.length > 0 ? (
            <div className="inventory-watch-list">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="inventory-watch-item">
                  <div>
                    <strong>{product.productName || product.name}</strong>
                    <p>{product.brand || "AyurKisan Product"}</p>
                  </div>
                  <span className={`stock-pill ${Number(product.stockQuantity || 0) <= 5 ? "critical" : "warning"}`}>
                    <AlertTriangle size={14} />
                    {product.stockQuantity} left
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-text">No low-stock products right now.</div>
          )}
        </motion.div>

        <motion.div className="premium-section admin-side-panel" variants={itemVariants}>
          <div className="admin-section-head">
            <div>
              <h3>Admin Snapshot</h3>
              <p>Quick counts based on available backend modules</p>
            </div>
          </div>

          <div className="snapshot-grid">
            <div className="snapshot-card">
              <ClipboardList size={18} />
              <strong>{categories}</strong>
              <span>Categories</span>
            </div>
            <div className="snapshot-card">
              <Truck size={18} />
              <strong>{shipmentsCount}</strong>
              <span>Shipments</span>
            </div>
            <div className="snapshot-card">
              <RefreshCw size={18} />
              <strong>{returnsCount}</strong>
              <span>Returns</span>
            </div>
            <div className="snapshot-card">
              <Users size={18} />
              <strong>{customers + retailers}</strong>
              <span>Total Users</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="dashboard-orders premium-section" variants={itemVariants}>
        <div className="admin-section-head">
          <div>
            <h3>Recent Orders</h3>
            <p>Latest orders received from the backend</p>
          </div>
        </div>

        <table className="admin-table gradient-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(recentOrders || []).map((order) => (
              <motion.tr key={order.id} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                <td>
                  <span className="id-badge">#{order.id.slice(-6).toUpperCase()}</span>
                </td>

                <td>
                  <div className="admin-profile">
                    <div className="admin-avatar">
                      {order.userName ? order.userName.charAt(0) : "U"}
                    </div>
                    <span className="admin-name fw-500">
                      {order.userName || "Unknown User"}
                    </span>
                  </div>
                </td>

                <td>
                  <span className={`status-badge status-${(order.orderStatus || "").toLowerCase()}`}>
                    {order.orderStatus || "PLACED"}
                  </span>
                </td>

                <td className="fw-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "-"}
                </td>

                <td className="price-text">
                  {formatPrice(order.totalDiscountedPrice)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;
