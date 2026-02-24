import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-left">
          <span className="small-title">AYURVEDIC HERBAL PRODUCTS</span>
          <h1>
            Bringing Natural <br /> Wellness To You
          </h1>
          <p>
            Discover premium Aloe Vera, Moringa, Tulsi and herbal
            wellness products crafted for a healthier lifestyle.
          </p>
          <button onClick={() => navigate("/signup")}>
            Shop Now
          </button>
        </div>

        <div className="hero-right">
          <img
            src="https://www.pexels.com/photo/yellow-flowers-in-brown-clay-pot-7526023/"
            alt="Herbal"
          />
        </div>
      </section>

      <section className="feature-section">
        <img
          src="https://images.unsplash.com/photo-1556228724-4d23e6b91f46"
          alt="Aloe"
        />

        <div className="feature-content">
          <h2>Why Choose Ayurkisan?</h2>
          <p>
            100% natural herbal wellness products with authentic
            Ayurvedic ingredients and strict quality testing.
          </p>

          <div className="stats">
            <div>
              <h3>97%</h3>
              <span>Customer Satisfaction</span>
            </div>

            <div>
              <h3>85%</h3>
              <span>Repeat Buyers</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Natural Ingredients</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;