import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";
import "../styles/auth/auth.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("CUSTOMER");
  const [errorText, setErrorText] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTabClick = (role) => {
    setActiveTab(role);
    setErrorText(""); // Clear errors on tab switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");

    try {
      const payload = { ...form, role: activeTab };
      const response = await loginUser(payload);

      const { token, role, userId } = response.data;

      login({
        token,
        role,
        userId,
        userName: form.email.split("@")[0]
      });

      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "CUSTOMER") navigate("/customer/dashboard");
      else if (role === "RETAILER") navigate("/retailer/dashboard");

    } catch (error) {
      setErrorText(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };


  const tabs = [
    { id: "CUSTOMER", label: "Customer" },
    { id: "RETAILER", label: "Retailer" },
    { id: "ADMIN", label: "Admin" }
  ];

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
              Unlock the secrets of Ayurveda.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Sign in to manage your wellness journey, track your organic orders, or oversee your retail store operations securely.
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
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          {/* ANIMATED ROLE TABS */}
          <div className="role-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`role-tab ${activeTab === tab.id ? "active" : ""}`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="active-tab-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 2 }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" " /* Required for floating label trick */
                required
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder=" "
                required
                value={form.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>

            {errorText && <div style={{ color: "red", fontSize: "12px", marginBottom: "15px", textAlign: "center" }}>{errorText}</div>}

            <motion.button 
              type="submit" 
              className="auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In as {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}
            </motion.button>
          </form>

          {activeTab !== "ADMIN" && (
            <div className="auth-footer">
              <p>Don't have an account?</p>
              {activeTab === "CUSTOMER" ? (
                <Link to="/signup/customer" className="auth-link">Create Customer Account</Link>
              ) : (
                <Link to="/signup/retailer" className="auth-link">Apply as Retailer</Link>
              )}
            </div>
          )}

        </motion.div>
      </div>

    </div>
  );
}

export default Login;
