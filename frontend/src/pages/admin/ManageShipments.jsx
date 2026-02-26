import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/admin.css";

function ManageShipments() {

  const [shipments, setShipments] = useState([
    {
      id: 1,
      orderId: 101,
      address: "Satara, Maharashtra",
      status: "PENDING",
    },
    {
      id: 2,
      orderId: 102,
      address: "Pune, Maharashtra",
      status: "SHIPPED",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setShipments(
      shipments.map(shipment =>
        shipment.id === id
          ? { ...shipment, status: newStatus }
          : shipment
      )
    );
  };

  return (
  <AdminLayout>
    
      <div className="admin-container">
        <h1>Manage Shipments</h1>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Order ID</th>
              <th>Address</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map(shipment => (
              <tr key={shipment.id}>
                <td>#{shipment.id}</td>
                <td>#{shipment.orderId}</td>
                <td>{shipment.address}</td>
                <td>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        shipment.status === "DELIVERED"
                          ? "green"
                          : shipment.status === "PENDING"
                          ? "#ff9800"
                          : "#1976d2",
                    }}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td>
                  <select
                    value={shipment.status}
                    onChange={(e) =>
                      updateStatus(shipment.id, e.target.value)
                    }
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="IN_TRANSIT">IN_TRANSIT</option>
                    <option value="DELIVERED">DELIVERED</option>
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

export default ManageShipments;