import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/customerDashboard.css";

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
        toast.error("Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await orderService.cancelOrder(orderId);
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, orderStatus: "CANCELLED" } : order
        )
      );
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    }
  };

  return (
    <div className="customer-content-inner">
      <h1 className="dashboard-title">My Orders</h1>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading your orders...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6">No orders found yet.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.items?.map((item) => item.productName).join(", ") || "Order items"}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  <td>{formatPrice(order.totalDiscountedPrice)}</td>
                  <td>
                    <span className={`status ${(order.orderStatus || "").toLowerCase()}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button className="view-btn" onClick={() => navigate(`/track-order/${order.id}`)}>
                      Track
                    </button>
                    {order.orderStatus !== "CANCELLED" && order.orderStatus !== "DELIVERED" ? (
                      <button className="view-btn" onClick={() => handleCancel(order.id)}>
                        Cancel
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;
