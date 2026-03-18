import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCart } from "../../services/cartService";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/pages/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const userId = localStorage.getItem("userId");
  const role = (localStorage.getItem("role") || "CUSTOMER").toUpperCase();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const loadCart = async () => {
      try {
        const cart = await getCart(userId, role);
        const items = cart.items || [];
        setCartItems(items);

        if (items.length === 0) {
          toast.info("Your cart is empty.");
          navigate("/products");
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        toast.error("Failed to load cart.");
      }
    };

    loadCart();
  }, [navigate, role, userId]);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.totalItemPrice || (item.discountedPrice || item.price) * item.quantity),
    0
  );

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!address.trim()) {
      toast.warning("Please provide a delivery address.");
      return;
    }

    try {
      setLoading(true);
      const response = await orderService.placeOrder(paymentMethod);
      toast.success(response.message || "Order placed successfully.");
      navigate("/order-confirmation", { state: { ...response, address } });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page container">
      <div className="checkout-grid">
        <div className="checkout-form-section card">
          <h2>Shipping Information</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label htmlFor="address">Full Delivery Address</label>
              <textarea
                id="address"
                placeholder="Street address, City, ZIP code"
                rows="4"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  Cash on Delivery
                </label>
                <label className="radio-label disabled">
                  <input type="radio" name="payment" value="ONLINE" disabled />
                  Online Payment (Coming Soon)
                </label>
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? "Processing..." : "Confirm & Place Order"}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section card">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="summary-item">
                <div className="item-info">
                  <span className="item-name">{item.productName}</span>
                  <span className="item-qty">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  {formatPrice(item.totalItemPrice || (item.discountedPrice || item.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            <hr />
            <div className="total-row main">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
