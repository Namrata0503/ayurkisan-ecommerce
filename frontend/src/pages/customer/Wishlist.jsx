import { Heart, ShoppingCart, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../services/cartService";
import { getWishlistItems, removeWishlistItem } from "../../services/wishlistService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/customerDashboard.css";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const userId = localStorage.getItem("userId");
  const role = (localStorage.getItem("role") || "CUSTOMER").toUpperCase();

  useEffect(() => {
    setWishlistProducts(getWishlistItems());
  }, []);

  const handleRemove = (productId) => {
    const updated = removeWishlistItem(productId);
    setWishlistProducts(updated);
    toast.success("Removed from wishlist.");
  };

  const handleAddToCart = async (product) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(userId, role, product.id, "PRODUCT", 1);
      toast.success(`${product.name} added to cart.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  return (
    <div className="customer-content-inner">
      <div className="account-page-header">
        <div>
          <h1 className="dashboard-title">My Wishlist</h1>
          <p className="account-page-subtitle">
            Save herbal products you want to revisit, compare, or buy later.
          </p>
        </div>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <div className="wishlist-card-top" onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.image} alt={product.name} />
                <span className="wishlist-badge">
                  <Heart size={14} /> Saved
                </span>
              </div>

              <div className="wishlist-card-body">
                <h3>{product.name}</h3>
                <p className="wishlist-category">{product.categoryName || "Herbal Wellness"}</p>
                <p className="price">{formatPrice(product.displayPrice)}</p>
              </div>

              <div className="wishlist-actions">
                <button className="cart-btn" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart size={16} /> Add to Cart
                </button>
                <button className="remove-btn" onClick={() => handleRemove(product.id)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="premium-section wishlist-empty-state">
          <div className="wishlist-empty-icon">
            <Sparkles size={26} />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Browse the collection and save products you want to keep an eye on.</p>
          <button className="update-btn wishlist-shop-btn" onClick={() => navigate("/products")}>
            Explore Products
          </button>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
