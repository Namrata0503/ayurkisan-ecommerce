import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Ayurkisan.</div>

      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-right">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="register-btn">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;