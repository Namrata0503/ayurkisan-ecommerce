import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <h2 className="footer-logo">Ayurkisan 🌿</h2>
          <p>
            Bringing natural wellness through authentic Ayurvedic
            and herbal products.
          </p>
          <p className="contact">
            📞 +91 98765 43210  
            <br />
            📍 Satara, Maharashtra
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaWhatsapp />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Ayurkisan. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;