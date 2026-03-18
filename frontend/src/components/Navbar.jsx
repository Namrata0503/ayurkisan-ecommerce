import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiMenu, FiMessageSquare, FiShoppingCart, FiTruck, FiUser, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import { getCart } from "../services/cartService";
import "../styles/components/navbar.css";

function Navbar() {
  const [showSignup, setShowSignup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toUpperCase();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadCartCount = async () => {
      if (!token || !userId || role !== "CUSTOMER") {
        setCartCount(0);
        return;
      }

      try {
        const cart = await getCart(userId, role);
        const totalItems = (cart.items || []).reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Cart count error:", error);
      }
    };

    loadCartCount();
  }, [location.pathname, role, token, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setCartCount(0);
    navigate("/login");
  };

  const getDashboardRoute = () => {
    if (role === "CUSTOMER") return "/customer/dashboard";
    if (role === "RETAILER") return "/retailer/dashboard";
    if (role === "ADMIN") return "/admin/dashboard";
    return "/";
  };

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Feedback", path: "/feedback" },
    { name: "Blog", path: "/#herbal-blog" }
  ];

  const authLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: "Track Order", path: "/track-order" },
    { name: "Feedback", path: "/feedback" },
    { name: "Blog", path: "/#herbal-blog" }
  ];

  const navLinks = token ? authLinks : guestLinks;

  return (
    <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar-creative glass-panel">
        <Link to="/" className="creative-logo">
          <img src={logo} alt="AyurKisan" className="logo-no-bg" />
        </Link>

        <div className="creative-nav-links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`creative-nav-item ${isActive ? "active" : ""}`}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <span className="nav-item-text">{link.name}</span>
                {isActive && !hoveredPath ? (
                  <motion.div
                    layoutId="nav-indicator"
                    className="nav-active-dot"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                ) : null}
                {hoveredPath === link.path ? (
                  <motion.div
                    layoutId="nav-hover-bg"
                    className="nav-hover-bg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="creative-nav-actions">
          <div className="creative-icons-tray">
            <Link to="/feedback" title="Feedback" className="tray-btn">
              <FiMessageSquare />
            </Link>
            <Link to="/#herbal-blog" title="Herbal Blog" className="tray-btn">
              <FiBookOpen />
            </Link>
            {token && (
              <>
                <Link to="/track-order" title="Track Order" className="tray-btn">
                  <FiTruck />
                </Link>
                <Link to="/cart" title="Cart" className="tray-btn">
                  <FiShoppingCart />
                  <span className="tray-badge">{cartCount}</span>
                </Link>
              </>
            )}
          </div>

          <div className="auth-separator"></div>

          <div className="creative-auth">
            {!token ? (
              <div
                className="creative-signup-wrapper"
                onMouseEnter={() => setShowSignup(true)}
                onMouseLeave={() => setShowSignup(false)}
              >
                <Link to="/login" className="creative-login-link">Login</Link>
                <button className="creative-cta-btn" type="button">
                  <span>Join Us</span>
                  <div className="cta-icon-circle"><FiArrowRight /></div>
                </button>

                <AnimatePresence>
                  {showSignup ? (
                    <motion.div
                      className="creative-dropdown-menu"
                      initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95, rotateX: -10 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transformOrigin: "top center" }}
                    >
                      <div className="dropdown-glow-effect"></div>
                      <Link to="/signup/customer" className="dropdown-item">
                        <div className="dropdown-item-text">
                          <h4>Customer</h4>
                          <p>Join and shop Ayurveda</p>
                        </div>
                      </Link>
                      <div className="dropdown-line"></div>
                      <Link to="/signup/retailer" className="dropdown-item">
                        <div className="dropdown-item-text">
                          <h4>Retailer</h4>
                          <p>Partner and grow</p>
                        </div>
                      </Link>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <div className="creative-logged-in">
                <Link to={getDashboardRoute()} className="creative-dashboard-pill">
                  <FiUser className="user-icon" /> <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="creative-logout-pill">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="creative-mobile-toggle" onClick={() => setMobileMenu((value) => !value)}>
          <motion.div animate={{ rotate: mobileMenu ? 90 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            {mobileMenu ? <FiX size={28} /> : <FiMenu size={28} />}
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenu ? (
          <motion.div
            className="creative-mobile-menu"
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <div className="mobile-links-container">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={location.pathname === link.path ? "active-mobile-link" : ""}
                  onClick={() => setMobileMenu(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mobile-divider"></div>

              <div className="mobile-customer-icons">
                <Link to="/cart" onClick={() => setMobileMenu(false)}><FiShoppingCart /> Cart ({cartCount})</Link>
                <Link to="/track-order" onClick={() => setMobileMenu(false)}><FiTruck /> Track Order</Link>
              </div>

              <div className="mobile-divider"></div>

              {!token ? (
                <div className="mobile-auth-links">
                  <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
                  <Link to="/signup/customer" onClick={() => setMobileMenu(false)}>Customer Signup</Link>
                  <Link to="/signup/retailer" onClick={() => setMobileMenu(false)}>Retailer Signup</Link>
                </div>
              ) : (
                <div className="mobile-auth-links">
                  <Link to={getDashboardRoute()} onClick={() => setMobileMenu(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileMenu(false); }} className="mobile-logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
