import AdminLayout from "../../layouts/AdminLayout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../../styles/admin.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const stats = [
    { title: "Total Products", value: 24 },
    { title: "Total Categories", value: 6 },
    { title: "Total Users", value: 120 },
    { title: "Total Orders", value: 58 },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 8000, 7500, 9000, 11000, 15000],
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46,125,50,0.2)",
        tension: 0.4,
      },
    ],
  };

  const recentOrders = [
    { id: 101, customer: "Ravi Sharma", amount: 899 },
    { id: 102, customer: "Sneha Traders", amount: 2499 },
    { id: 103, customer: "Anita Patil", amount: 599 },
  ];

  return (
    <AdminLayout>

      <div className="admin-dashboard">

        {/* Stat Cards */}
        <div className="dashboard-grid">
          {stats.map((item, index) => (
            <div key={index} className="dashboard-card">
              <h4>{item.title}</h4>
              <h2>{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="dashboard-chart">
          <h3>Revenue Overview</h3>
          <Line data={chartData} />
        </div>

        {/* Recent Orders */}
        <div className="dashboard-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>₹{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;