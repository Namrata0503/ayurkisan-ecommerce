import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/admin.css";

function ManageReturns() {

  const [returns, setReturns] = useState([
    {
      id: 1,
      orderId: 101,
      customer: "Ravi Sharma",
      reason: "Damaged product",
      status: "REQUESTED",
    },
    {
      id: 2,
      orderId: 102,
      customer: "Sneha Traders",
      reason: "Wrong item received",
      status: "APPROVED",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setReturns(
      returns.map(ret =>
        ret.id === id
          ? { ...ret, status: newStatus }
          : ret
      )
    );
  };

  return (
    <AdminLayout>
      
      <div className="admin-container">
        <h1>Manage Returns</h1>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Return ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {returns.map(ret => (
              <tr key={ret.id}>
                <td>#{ret.id}</td>
                <td>#{ret.orderId}</td>
                <td>{ret.customer}</td>
                <td>{ret.reason}</td>
                <td>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        ret.status === "APPROVED"
                          ? "green"
                          : ret.status === "REJECTED"
                          ? "red"
                          : "#ff9800",
                    }}
                  >
                    {ret.status}
                  </span>
                </td>
                <td>
                  <select
                    value={ret.status}
                    onChange={(e) =>
                      updateStatus(ret.id, e.target.value)
                    }
                  >
                    <option value="REQUESTED">REQUESTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="COMPLETED">COMPLETED</option>
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

export default ManageReturns;