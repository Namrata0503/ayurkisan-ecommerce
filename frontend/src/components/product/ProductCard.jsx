import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addToCart } from "../../services/cartService";
import { isWishlisted, toggleWishlistItem } from "../../services/wishlistService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/components/productCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const productId = product.id || product._id;
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(productId));
  }, [productId]);

  const handleAddToCart = async (event) => {
    event.stopPropagation();

    const userId = localStorage.getItem("userId");
    const role = (localStorage.getItem("role") || "CUSTOMER").toUpperCase();

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(userId, role, productId, "PRODUCT", 1);
      toast.success(`${product.productName || product.name} added to cart.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  const handleWishlistToggle = (event) => {
    event.stopPropagation();

    const wishlistProduct = {
      ...product,
      id: productId,
      name: product.productName || product.name,
      image: product.productImage || product.image,
      displayPrice: product.displayPrice || product.finalPrice || product.price
    };
    const result = toggleWishlistItem(wishlistProduct);
    setWishlisted(result.added);
    toast.success(
      result.added
        ? `${wishlistProduct.name} added to wishlist.`
        : `${wishlistProduct.name} removed from wishlist.`
    );
  };

  return (
    <div className="product-card-premium" onClick={() => navigate(`/product/${productId}`)}>
      <div className="card-badges">
        <span className="discount-badge">Herbal Choice</span>
      </div>

      <div className="product-image-wrapper">
        <img src={product.productImage || product.image} alt={product.productName || product.name} />

        <div className="image-overlay-actions">
          <button
            className="action-btn"
            title="Quick View"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/product/${productId}`);
            }}
          >
            <FaEye />
          </button>
          <button
            className="action-btn"
            title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={handleWishlistToggle}
          >
            {wishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <div className="product-info-premium">
        <div className="title-row">
          <h3>{product.productName || product.name}</h3>
          <p className="price">{formatPrice(product.displayPrice || product.finalPrice || product.price)}</p>
        </div>

        <div className="rating-row">
          <div className="stars">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar className="inactive" />
          </div>
          <span className="reviews-count">{product.categoryName || "Wellness"}</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <FaShoppingCart className="cart-icon" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
