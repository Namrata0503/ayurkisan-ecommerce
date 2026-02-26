import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/admin.css";

function ManageOrders() {

  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: "Ravi Sharma",
      totalAmount: 899,
      status: "CREATED",
    },
    {
      id: 102,
      customer: "Sneha Traders",
      totalAmount: 2499,
      status: "SHIPPED",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map(order =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

 return (
    <AdminLayout>
     

      <div className="admin-container">
        <h1>Manage Orders</h1>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        order.status === "DELIVERED"
                          ? "green"
                          : order.status === "CANCELLED"
                          ? "red"
                          : "#ff9800",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                  >
                    <option value="CREATED">CREATED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  </AdminLayout>
);
}

export default ManageOrders;