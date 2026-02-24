import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();

  // Temporary dummy data (later from backend)
  const product = {
    id,
    name: "Aloe Vera Juice",
    price: 299,
    description:
      "Pure Aloe Vera juice made from fresh leaves. Supports digestion and immunity.",
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f",
  };

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-left">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-right">
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>
          <p>{product.description}</p>

          <div className="quantity">
            <label>Quantity:</label>
            <input type="number" min="1" defaultValue="1" />
          </div>

          <button className="add-cart-btn">Add to Cart</button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;