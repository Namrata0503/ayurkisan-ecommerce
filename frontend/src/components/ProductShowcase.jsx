import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiEye, FiHeart, FiPlus, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import { addToCart } from "../services/cartService";
import { getAllProducts } from "../services/productService";
import { getWishlistItems, toggleWishlistItem } from "../services/wishlistService";
import { formatPrice, normalizeProduct } from "../utils/normalize";
import "../styles/components/productShowcase.css";

function ProductSkeleton() {
  return (
    <div className="product-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="skeleton-card"></div>
      ))}
    </div>
  );
}

function ProductShowcase() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const tabs = ["All", "Trending", "New Arrivals"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data.map((product) => normalizeProduct(product)));
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setWishlist(getWishlistItems().map((item) => item.id));
  }, []);

  useEffect(() => {
    let result = products;
    if (activeTab === "Trending") {
      result = products.slice(0, 6);
    } else if (activeTab === "New Arrivals") {
      result = products.slice(-6).reverse();
    } else {
      result = products.slice(0, 8);
    }
    setFilteredProducts(result);
  }, [activeTab, products]);

  const toggleWishlist = (event, product) => {
    event.stopPropagation();
    const result = toggleWishlistItem(product);
    setWishlist(result.items.map((item) => item.id));
    toast.success(result.added ? `${product.name} added to wishlist.` : `${product.name} removed from wishlist.`);
  };

  const handleAddToCart = async (event, product) => {
    event.stopPropagation();
    const userId = localStorage.getItem("userId");
    const role = (localStorage.getItem("role") || "").toUpperCase();

    if (!userId || !role) {
      toast.info("Please login as a customer or retailer to shop.");
      navigate("/login");
      return;
    }

    try {
      setAddingToCart(product.id);
      await addToCart(userId, role, product.id, "PRODUCT", 1);
      toast.success(`${product.name} added to cart.`);
    } catch (error) {
      console.error("Cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <section className="product-showcase">
      <div className="product-header">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Curated <span>Collections</span>
        </motion.h2>
        <p>Directly from nature to your daily wellness routine.</p>
      </div>

      <div className="product-filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab ? <motion.div layoutId="tab-indicator" className="tab-indicator" /> : null}
          </button>
        ))}
      </div>

      {loading ? (
        <ProductSkeleton />
      ) : (
        <motion.div layout className="product-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`product-card ${index % 5 === 0 ? "card-wide" : ""}`}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <button
                  className={`wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}`}
                  onClick={(event) => toggleWishlist(event, product)}
                >
                  <FiHeart fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </button>

                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-overlay">
                    <button className="overlay-btn view-details-btn">
                      <FiEye /> View Detail
                    </button>
                    <button
                      className="overlay-btn quick-add-btn"
                      disabled={addingToCart === product.id}
                      onClick={(event) => handleAddToCart(event, product)}
                    >
                      <FiPlus /> {addingToCart === product.id ? "Adding..." : "Quick Add"}
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <span className="product-category">{product.categoryName}</span>
                  <h3>{product.name}</h3>
                  <div className="product-bottom-row">
                    <span className="product-price">{formatPrice(product.displayPrice)}</span>
                    <button className="mini-cart-add" onClick={(event) => handleAddToCart(event, product)}>
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="product-footer-action">
        <button className="view-all-btn" onClick={() => navigate("/products")}>
          View Entire Collection
        </button>
      </div>
    </section>
  );
}

export default ProductShowcase;
