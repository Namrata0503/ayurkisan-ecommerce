import { BarChart3, Home, LayoutDashboard, PackagePlus, ShoppingBag, Store } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "../styles/dashboard/retailerDashboard.css";

function RetailerSidebar() {
  return (
    <div className="retailer-sidebar">
      <div className="retailer-sidebar-header">
        <Link to="/" className="sidebar-logo-link">
          <img src="/src/assets/logo.png" alt="AyurKisan" className="sidebar-logo-img" />
        </Link>
        <p className="retailer-sidebar-subtitle">Retailer workspace</p>
      </div>

      <NavLink to="/" className="home-link-nav">
        <Home size={18} />
        <span>Go to Home</span>
      </NavLink>

      <NavLink to="/retailer/dashboard">
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/retailer/products">
        <Store size={18} />
        <span>My Products</span>
      </NavLink>

      <NavLink to="/retailer/add-product">
        <PackagePlus size={18} />
        <span>Add Product</span>
      </NavLink>

      <NavLink to="/retailer/orders">
        <ShoppingBag size={18} />
        <span>Orders</span>
      </NavLink>

      <NavLink to="/retailer/analytics">
        <BarChart3 size={18} />
        <span>Sales Analytics</span>
      </NavLink>
    </div>
  );
}

export default RetailerSidebar;
