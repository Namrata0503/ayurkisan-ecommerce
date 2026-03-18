import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import { getProductFeedback } from "../services/feedbackService";
import { normalizeProduct } from "../utils/normalize";
import FeedbackSection from "../components/FeedbackSection";

function FeedbackPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        const normalized = data.map((product) => normalizeProduct(product));
        setProducts(normalized);
        if (normalized.length > 0) {
          setSelectedProductId(normalized[0].id);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadReviews = async () => {
      if (!selectedProductId) {
        setReviewCount(0);
        return;
      }

      try {
        const data = await getProductFeedback(selectedProductId);
        setReviewCount(data.length);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    };

    loadReviews();
  }, [selectedProductId]);

  return (
    <div className="feedback-page container reveal active">
      <div className="feedback-hero text-center">
        <h1>Voice of Our Customers</h1>
        <p>Your feedback helps us grow and provide the best organic products for your health.</p>
      </div>

      <div className="feedback-layout">
        <div className="product-selection-sidebar glass">
          <h3>Select a Product</h3>
          <p>Browse our catalog and see what others are saying.</p>

          <div className="form-group">
            <label htmlFor="product">Choose Product</label>
            <div className="select-wrapper">
              <select id="product" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)}>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="review-stats">
            <span className="stats-number">{reviewCount}</span>
            <span className="stats-label">Reviews Shared</span>
          </div>

          <Link to="/products" className="browse-more-btn">Explore More Products</Link>
        </div>

        <div className="feedback-main-content">
          {selectedProductId ? (
            <FeedbackSection productId={selectedProductId} />
          ) : (
            <div className="no-selection glass">
              <p>Please select a product from the sidebar to view or add feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
