import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { customerSignup } from "../services/authService";
import "../styles/auth/auth.css";
import logo from "../assets/logo.png";

function CustomerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await customerSignup({
        name: form.name,
        address: form.address,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });

      toast.success("Registration Successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Signup Detail Error:", error);
      const backendMessage = error.response?.data?.message || error.response?.data?.error || "Registration Failed";
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-wrapper">
      
      {/* LEFT SIDE - VISUAL */}
      <div className="auth-visual auth-visual-herbal">
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
              Embrace Natural Wellness
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join AyurKisan to discover authentic, organically sourced Ayurvedic remedies delivered directly to your doorstep.
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
            <h2>Create Account</h2>
            <p>Start your wellness journey today.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input name="name" id="name" placeholder=" " onChange={handleChange} required />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="input-group">
              <input name="email" id="c-email" type="email" placeholder=" " onChange={handleChange} required />
              <label htmlFor="c-email">Email Address</label>
            </div>

            <div className="input-group">
              <input name="phoneNumber" id="phone" placeholder=" " onChange={handleChange} required />
              <label htmlFor="phone">Phone Number</label>
            </div>

            <div className="input-group">
              <input name="address" id="address" placeholder=" " onChange={handleChange} required />
              <label htmlFor="address">Delivery Address</label>
            </div>

            <div className="input-group">
              <input name="password" id="c-password" type="password" placeholder=" " onChange={handleChange} required />
              <label htmlFor="c-password">Password</label>
            </div>

            <div className="input-group">
              <input name="confirmPassword" id="confirmPassword" type="password" placeholder=" " onChange={handleChange} required />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <motion.button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Registering..." : "Create Account"}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="auth-link">Sign in here</Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default CustomerSignup;