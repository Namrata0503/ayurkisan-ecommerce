import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUMN 1 - BRAND */}
        <div className="footer-col brand">
          <h2>Ayurkisan 🌿</h2>
          <p>
            Premium Ayurvedic and Herbal wellness products
            crafted with purity, authenticity and care.
          </p>
        </div>

        {/* COLUMN 2 - QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* COLUMN 3 - SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* COLUMN 4 - CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: support@ayurkisan.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>India 🇮🇳</p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ayurkisan. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;