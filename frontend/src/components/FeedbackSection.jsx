import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addFeedback, getProductFeedback } from "../services/feedbackService";
import "../styles/components/feedback.css";

function StarRating({ rating, setRating, interactive = false }) {
  return (
    <div className={interactive ? "rating-input" : "rating-stars"}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "active" : ""}`}
          onClick={() => interactive && setRating(star)}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function FeedbackSection({ productId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const role = (localStorage.getItem("role") || "CUSTOMER").toUpperCase();
  const userName = localStorage.getItem("userName") || "AyurKisan User";

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await getProductFeedback(productId);
        setFeedbacks(data);
      } catch (error) {
        console.error("Failed to load feedback:", error);
      }
    };

    if (productId) {
      loadFeedback();
    }
  }, [productId]);

  const handleSubmit = async () => {
    if (!userId) {
      toast.info("Login to submit feedback.");
      return;
    }

    if (!comment.trim()) {
      toast.warning("Please add a short review first.");
      return;
    }

    try {
      setLoading(true);
      await addFeedback({
        productId,
        userId,
        userName,
        role,
        rating: Number(rating),
        comments: comment,
        suggestions: ""
      });

      const refreshed = await getProductFeedback(productId);
      setFeedbacks(refreshed);
      setComment("");
      setRating(5);
      toast.success("Feedback submitted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "A";
  };

  return (
    <div className="feedback-section">
      <h3>Customer Experiences</h3>

      <div className="feedback-grid">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card reveal active">
              <div className="feedback-user">
                <div className="user-avatar">{getUserInitial(feedback.userName)}</div>
                <strong>{feedback.userName}</strong>
              </div>
              <div className="feedback-meta">
                <StarRating rating={feedback.rating} />
                <span className="customer-badge">{feedback.role}</span>
              </div>
              <p className="feedback-comment">"{feedback.comments}"</p>
            </div>
          ))
        ) : (
          <p className="no-feedback text-center">No reviews yet. Be the first to share your experience!</p>
        )}
      </div>

      {userId ? (
        <div className="feedback-form reveal active">
          <h4>Share Your Thoughts</h4>
          <div className="form-group">
            <label>Your Rating</label>
            <StarRating rating={rating} setRating={setRating} interactive={true} />
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea
              placeholder="Tell us what you liked about this product..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>

          <button className="submit-review-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Sharing..." : "Post Review"}
          </button>
        </div>
      ) : (
        <div className="feedback-login-prompt glass reveal active">
          <p>Loved this product? <Link to="/login" className="login-link">Sign in</Link> to share your experience with the community.</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackSection;
