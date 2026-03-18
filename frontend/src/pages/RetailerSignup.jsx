import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { retailerSignup } from "../services/authService";
import "../styles/auth/auth.css";
import logo from "../assets/logo.png";

function RetailerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firmName: "",
    ownerName: "",
    address: "",
    email: "",
    phoneNumber: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firmName || !form.email || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await retailerSignup({
        retailerName: form.ownerName, // 👈 Maps to backend RetailerSignupRequest
        firmName: form.firmName,
        registrationId: form.gstNumber, // 👈 Maps to backend
        address: form.address,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });

      toast.success("Retailer Registered Successfully!");


      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Retailer Registration Failed"
      );
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
              Grow your business organically.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Partner with AyurKisan to supply premium, ethically sourced Ayurvedic products to your local community.
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
            <h2>Retailer Application</h2>
            <p>Fill in your details to start selling.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input name="firmName" id="firmName" placeholder=" " onChange={handleChange} required />
              <label htmlFor="firmName">Firm/Shop Name</label>
            </div>

            <div className="input-group">
              <input name="ownerName" id="ownerName" placeholder=" " onChange={handleChange} required />
              <label htmlFor="ownerName">Owner Name</label>
            </div>

            <div className="input-group">
              <input name="email" id="r-email" type="email" placeholder=" " onChange={handleChange} required />
              <label htmlFor="r-email">Business Email</label>
            </div>

            <div className="input-group">
              <input name="phoneNumber" id="r-phone" placeholder=" " onChange={handleChange} required />
              <label htmlFor="r-phone">Phone Number</label>
            </div>
            
            <div className="input-group">
              <input name="gstNumber" id="gstNumber" placeholder=" " onChange={handleChange} required />
              <label htmlFor="gstNumber">GST Number</label>
            </div>

            <div className="input-group">
              <input name="address" id="r-address" placeholder=" " onChange={handleChange} required />
              <label htmlFor="r-address">Business Address</label>
            </div>

            <div className="input-group">
              <input name="password" id="r-password" type="password" placeholder=" " onChange={handleChange} required />
              <label htmlFor="r-password">Password</label>
            </div>

            <div className="input-group">
              <input name="confirmPassword" id="r-confirmPassword" type="password" placeholder=" " onChange={handleChange} required />
              <label htmlFor="r-confirmPassword">Confirm Password</label>
            </div>

            <motion.button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Submitting..." : "Apply as Retailer"}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Already a registered retailer?</p>
            <Link to="/login" className="auth-link">Sign in here</Link>
          </div>

        </motion.div>
      </div>

    </div>
  );
}

export default RetailerSignup;