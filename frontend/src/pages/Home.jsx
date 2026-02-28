import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import heroImage from "../assets/images/heroimage.jpg";

import aloeNeemImg from "../assets/products_img/aloeneemtulsi.png";
import alomoringaImg from "../assets/products_img/aloemoringa.png";
import ayupowerImg from "../assets/products_img/ayupower.png";

//components
function Home() {
  const navigate = useNavigate();
// Scroll Reveal Effect
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-container">

          <div className="hero-left">
            <span className="small-title">
              AYURVEDIC HERBAL WELLNESS
            </span>

            <h1>
              Natural Healing <br />
              Starts From Within 🌿
            </h1>

            <p>
              Experience the purity of Aloe Vera, Moringa,
              Tulsi and Ayurvedic blends crafted for
              complete wellness and vitality.
            </p>

            <div className="hero-buttons">
              <button onClick={() => navigate("/signup")}>
                Shop Now
              </button>

              <button
                className="outline-btn"
                onClick={() => navigate("/shop")}
              >
                Explore Collection
              </button>
            </div>
          </div>

          <div className="hero-right">
            <img src={heroImage} alt="Herbal Products" />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features reveal">
        <div className="features-container">

          <div className="feature-card">
            <h3>100% Natural</h3>
            <p>No chemicals, no preservatives. Pure Ayurvedic goodness.</p>
          </div>

          <div className="feature-card">
            <h3>Authentic Ingredients</h3>
            <p>Sourced directly from trusted organic farms.</p>
          </div>

          <div className="feature-card">
            <h3>Lab Tested</h3>
            <p>Strict quality checks to ensure premium standards.</p>
          </div>

        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="best-sellers reveal">
        <h2>Our Best Sellers</h2>

        <div className="products-grid">

          <div className="product-card">
  <img src={aloeNeemImg} alt="Aloe Neem Tulsi Juice" className="product-image" />
  <h4>Aloe Neem Tulsi</h4>
  <p>₹499</p>
  <button onClick={() => navigate("/shop")}>View</button>
</div>

<div className="product-card">
  <img src={alomoringaImg} alt="Alo Moringa Juice" className="product-image" />
  <h4>Alo Moringa</h4>
  <p>₹349</p>
  <button onClick={() => navigate("/shop")}>View</button>
</div>

<div className="product-card">
  <img src={ayupowerImg} alt="Ayupower Tea" className="product-image" />
  <h4>Ayupower Tea</h4>
  <p>₹299</p>
  <button onClick={() => navigate("/shop")}>View</button>
</div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;