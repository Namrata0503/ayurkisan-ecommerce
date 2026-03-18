import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { getCart, removeFromCart, updateQuantity } from "../../services/cartService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/pages/cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const role = (localStorage.getItem("role") || "CUSTOMER").toUpperCase();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);
        const cart = await getCart(userId, role);
        setCartItems(cart.items || []);
      } catch (error) {
        console.error("Error loading cart:", error);
        toast.error("Failed to load your cart.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [navigate, role, userId]);

  const handleQuantityChange = async (item, nextQuantity) => {
    if (nextQuantity < 1) {
      return;
    }

    try {
      await updateQuantity(userId, item.productId, item.itemType, nextQuantity);
      setCartItems((current) =>
        current.map((entry) =>
          entry.productId === item.productId
            ? {
                ...entry,
                quantity: nextQuantity,
                totalItemPrice: (entry.discountedPrice || entry.price) * nextQuantity
              }
            : entry
        )
      );
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeFromCart(userId, item.productId, item.itemType);
      setCartItems((current) => current.filter((entry) => entry.productId !== item.productId));
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.totalItemPrice || (item.discountedPrice || item.price) * item.quantity),
    0
  );

  if (loading) {
    return <div className="cart-loading">Loading your wellness basket...</div>;
  }

  return (
    <div className="cart-page container">
      <motion.div className="cart-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Your Shopping <span className="text-gradient">Cart</span></h1>
        <p>You have {cartItems.length} items in your basket</p>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div className="empty-cart card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <FiShoppingCart size={60} />
          <h2>Your cart is empty</h2>
          <p>Explore the catalog and add a few herbal essentials.</p>
          <Link to="/products" className="shop-now-btn">Start Shopping</Link>
        </motion.div>
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-list">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  className="cart-item card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  layout
                >
                  <img src={item.productImage || "https://via.placeholder.com/100"} alt={item.productName} className="item-img" />

                  <div className="item-details">
                    <h3>{item.productName}</h3>
                    <p className="item-price">{formatPrice(item.discountedPrice || item.price)}</p>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)}><FiPlus /></button>
                  </div>

                  <div className="item-subtotal">
                    {formatPrice(item.totalItemPrice || (item.discountedPrice || item.price) * item.quantity)}
                  </div>

                  <button className="remove-btn" onClick={() => handleRemove(item)}>
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="cart-summary-card card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Grand Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout <FiArrowRight />
            </button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
