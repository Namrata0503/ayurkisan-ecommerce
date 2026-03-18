import { Link, NavLink } from "react-router-dom";
import { Heart, Home, LayoutDashboard, MapPin, ShoppingBag, UserCircle } from "lucide-react";
import "../styles/dashboard/customerDashboard.css";

function CustomerSidebar() {
  return (
    <div className="customer-sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo-container">
          <img src="/src/assets/logo.png" alt="AyurKisan" className="sidebar-logo-img" />
        </Link>
        <p className="sidebar-subtitle">Customer account</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="home-link-nav">
          <Home size={20} className="nav-icon" />
          <span>Go to Home</span>
        </NavLink>
        <NavLink to="/customer/dashboard" end>
          <LayoutDashboard size={20} className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/customer/orders">
          <ShoppingBag size={20} className="nav-icon" />
          <span>My Orders</span>
        </NavLink>

        <NavLink to="/customer/wishlist">
          <Heart size={20} className="nav-icon" />
          <span>Wishlist</span>
        </NavLink>

        <NavLink to="/customer/address">
          <MapPin size={20} className="nav-icon" />
          <span>Address</span>
        </NavLink>

        <NavLink to="/customer/profile">
          <UserCircle size={20} className="nav-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default CustomerSidebar;
