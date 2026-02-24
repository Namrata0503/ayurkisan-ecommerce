import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "../styles/navbar.css";
import logo from "../assets/Company Logos (1024 × 1024 px).png";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Ayurkisan Logo" />
        </div>

        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-right">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => setOpenModal(true)}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Signup Modal */}
      <Modal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
>
  <div className="signup-modal">
    <h2>Select Account Type</h2>

    <div className="account-options">

      <div
        className="account-card"
        onClick={() => {
          setOpenModal(false);
          navigate("/signup/customer");
        }}
      >
        <div className="icon">👤</div>
        <h3>Individual Customer</h3>
        <p>Shop herbal products for personal use</p>
      </div>

      <div
        className="account-card"
        onClick={() => {
          setOpenModal(false);
          navigate("/signup/retailer");
        }}
      >
        <div className="icon">🏬</div>
        <h3>Retailer / Bulk Buyer</h3>
        <p>Purchase products in bulk for resale</p>
      </div>

    </div>
  </div>
</Modal>
    </>
  );
}

export default Navbar;