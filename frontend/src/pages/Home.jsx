import Hero from "../components/Hero";
import FeatureBar from "../components/FeatureBar";
import AboutSection from "../components/AboutSection";
import FeatureCards from "../components/FeatureCards";
import CTASection from "../components/CTASection";
import TrustSection from "../components/TrustSection";
import ProductShowcase from "../components/ProductShowcase";
import TestimonialSection from "../components/TestimonialSection";
import StatsSection from "../components/StatsSection";
import CTABanner from "../components/CTABanner";
import HeroSlider from "../components/HeroSlider";
import BlogSection from "../components/BlogSection";

import "../styles/pages/home.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

  // Scroll Reveal Animation
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const visible = 120;

        if (elementTop < windowHeight - visible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="home-page">            
  
      {/* MAIN HERO */}
      <section className="reveal">
        <Hero />
      </section>

      {/* HERO ADS SLIDER */}
      <section className="reveal">
        <HeroSlider />
      </section>

      {/* HERBAL BLOG */}
      <section className="reveal">
        <BlogSection />
      </section>

        {/* PRODUCTS */}
      <section className="reveal">
        <ProductShowcase />
      </section>

       {/* TRUST BADGES */}
      <section className="reveal">
        <TrustSection />
      </section>

      {/* QUICK FEATURES */}
      <section className="reveal">
        <FeatureBar />
      </section>   

      {/* STATISTICS */}
      <section className="reveal">
        <StatsSection />
      </section>

      {/* WHY CHOOSE US */}
      <section className="reveal">
        <FeatureCards />
      </section>

{/* CALL TO ACTION */}
      <section className="reveal">
        <CTASection />
      </section>

      {/* TESTIMONIALS */}
      <section className="reveal">
        <TestimonialSection />
      </section>

      {/* ABOUT */}
      <section className="reveal">
        <AboutSection />
      </section>

      <section className="reveal home-connect-section">
        <div className="container home-connect-grid">
          <div className="home-connect-card about-card">
            <span className="home-connect-tag">About Us</span>
            <h2>Built around authentic Ayurvedic wellness and trusted farming roots.</h2>
            <p>
              Learn how AyurKisan brings natural products, transparent sourcing,
              and modern ecommerce together for a healthier lifestyle.
            </p>
            <Link to="/about" className="home-connect-btn">
              Explore Our Story
            </Link>
          </div>

          <div className="home-connect-card contact-card">
            <span className="home-connect-tag">Contact Us</span>
            <h2>Need help with orders, products, or your wellness journey?</h2>
            <p>
              Reach our support team for product guidance, delivery help, and retail partnership questions.
            </p>
            <div className="home-contact-list">
              <span>support@ayurkisan.com</span>
              <span>+91 98765 43210</span>
              <span>Pune, Maharashtra</span>
            </div>
            <Link to="/contact" className="home-connect-btn">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL BANNER */}
      <section className="reveal">
        <CTABanner />
      </section>

    </div>
  );
}

export default Home;
