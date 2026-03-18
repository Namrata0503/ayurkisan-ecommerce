import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/auth/auth.css";
import logo from "../../assets/logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email === "admin@ayurkisan.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("role", "ADMIN");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="auth-split-wrapper">
      
      {/* LEFT SIDE - VISUAL */}
      <div 
        className="auth-visual" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80")'}}
      >
        <div className="auth-visual-overlay"></div>
        <div className="auth-visual-content">
          <Link to="/" className="auth-visual-logo">
            <img src={logo} alt="AyurKisan" />
            <span>AyurKisan</span>
          </Link>

          <div className="auth-visual-quote">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Command Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Manage your robust e-commerce platform with precision. Oversee users, products, and analytics seamlessly.
            </motion.p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="auth-form-area">
        <motion.div 
          className="auth-glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h2>Admin Portal</h2>
            <p>Secure access to your dashboard.</p>
          </div>

          {error && <div style={{ color: "#ff4d4f", fontSize: "12px", marginBottom: "15px", textAlign: "center", fontWeight: "500", padding: "8px", background: "rgba(255, 77, 79, 0.1)", borderRadius: "6px" }}>{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Admin Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <motion.button 
              type="submit" 
              className="auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login as Administrator
            </motion.button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLogin;