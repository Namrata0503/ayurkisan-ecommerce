import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiHeart, FiShield, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import ProductCard from "../components/product/ProductCard";
import FeedbackSection from "../components/FeedbackSection";
import categoryService from "../services/categoryService";
import { addToCart } from "../services/cartService";
import productService from "../services/productService";
import { isWishlisted, toggleWishlistItem } from "../services/wishlistService";
import { formatPrice, normalizeProduct } from "../utils/normalize";
import "../styles/pages/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [products, categories] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories()
        ]);

        const current = products.find((item) => item.id === id);
        if (!current) {
          setProduct(null);
          return;
        }

        const normalizedProduct = normalizeProduct(current, categories);
        setProduct(normalizedProduct);
        setWishlisted(isWishlisted(normalizedProduct.id));

        const related = products
          .filter((item) => item.id !== id)
          .filter((item) => item.categoryId === current.categoryId)
          .slice(0, 4)
          .map((item) => normalizeProduct(item, categories));

        setRelatedProducts(related);
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Unable to load product details.");
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    const role = (localStorage.getItem("role") || "CUSTOMER").toUpperCase();

    if (!userId) {
      toast.info("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(userId, role, product.id, "PRODUCT", quantity);
      toast.success(`${quantity} item(s) added to cart.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    const result = toggleWishlistItem(product);
    setWishlisted(result.added);
    toast.success(result.added ? `${product.name} added to wishlist.` : `${product.name} removed from wishlist.`);
  };

  if (!product) {
    return <div className="product-loading">Loading product details...</div>;
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <motion.button
          className="back-btn"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FiArrowLeft /> Back to Products
        </motion.button>

        <div className="product-layout-premium">
          <motion.div
            className="product-gallery"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="main-image-container glass-panel">
              <img src={product.image} alt={product.name} />
            </div>
          </motion.div>

          <motion.div
            className="product-info-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="product-badges">
              {[product.categoryName, product.brand, "Ayurvedic"].filter(Boolean).map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            <h1>{product.name}</h1>

            <div className="rating-block">
              <div className="stars">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </div>
              <span>Premium wellness choice</span>
            </div>

            <p className="price">{formatPrice(product.displayPrice)}</p>
            <p className="description">{product.description}</p>

            <div className="trust-features">
              <div className="tf-item"><FiCheck /> Natural ingredients</div>
              <div className="tf-item"><FiShield /> Quality assured</div>
            </div>

            <div className="purchase-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((value) => value + 1)}>+</button>
              </div>

              <button className="add-cart-btn-large" onClick={handleAddToCart} disabled={addingToCart}>
                <FiShoppingCart /> {addingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <button
                className={`wishlist-btn-large ${wishlisted ? "active" : ""}`}
                type="button"
                onClick={handleWishlistToggle}
              >
                <FiHeart />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="product-details-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="detail-card glass-panel">
            <h3>Ingredients</h3>
            <p>{product.ingredients || "Ingredients will be updated soon."}</p>
          </div>
          <div className="detail-card glass-panel">
            <h3>Usage Guidance</h3>
            <ul>
              {[product.usageInstructions, product.dosage, product.sideEffects]
                .filter(Boolean)
                .map((item) => (
                  <li key={item}><FiCheck className="check-icon" /> {item}</li>
                ))}
            </ul>
          </div>
        </motion.div>

        <FeedbackSection productId={product.id} />

        <motion.div
          className="related-products-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <h2>You May Also Like</h2>
            <div className="heading-line"></div>
          </div>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;
