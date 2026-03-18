import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/normalize";

function OrderConfirmation() {
  const { state } = useLocation();

  return (
    <div className="checkout-page container">
      <div className="checkout-form-section card" style={{ maxWidth: "760px", margin: "40px auto" }}>
        <h2>Order Confirmed</h2>
        <p>Your herbal order has been placed successfully.</p>
        <p><strong>Order ID:</strong> {state?.orderId || "Not available"}</p>
        <p><strong>Payment Method:</strong> {state?.paymentMethod || "COD"}</p>
        <p><strong>Total Amount:</strong> {formatPrice(state?.totalAmount || 0)}</p>
        <p><strong>Delivery Address:</strong> {state?.address || "Saved in your account/order profile"}</p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
          <Link to="/customer/orders" className="place-order-btn">View Orders</Link>
          <Link to={state?.orderId ? `/track-order/${state.orderId}` : "/track-order"} className="place-order-btn">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
