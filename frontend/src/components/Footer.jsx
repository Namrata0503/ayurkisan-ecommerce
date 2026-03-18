import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp, FaLeaf } from "react-icons/fa";
import "../styles/components/footer.css";

function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-container">
        
        {/* BRAND & ABOUT */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <FaLeaf className="brand-icon" />
            <h2>AyurKisan</h2>
          </div>
          <p className="footer-desc">
            Bringing the authentic, healing power of ancient Ayurveda to your modern lifestyle.
            Pure, organic, and rooted in nature.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaWhatsapp /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop Ayurveda</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/returns">Return Policy</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col newsletter-col">
          <h4>Stay Connected</h4>
          <p>Subscribe for wellness tips and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Join</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} AyurKisan Wellness. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Made with 💚 for holistic wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;