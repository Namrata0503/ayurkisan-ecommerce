import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaList,
  FaUsers,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaTachometerAlt,
  FaBell,
  FaMoon,
  FaSun,
  FaBars
} from "react-icons/fa";
import "../styles/adminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`admin-layout ${darkMode ? "dark" : ""}`}>

      {/* Sidebar */}
      <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

        <div className="sidebar-top">
          <h2 className="admin-logo">
            {collapsed ? "AK" : "Ayurkisan"}
          </h2>
          <FaBars
            className="toggle-icon"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <ul>
          <li>
            <NavLink to="/admin/dashboard">
              <FaTachometerAlt />
              {!collapsed && "Dashboard"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/categories">
              <FaList />
              {!collapsed && "Categories"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/products">
              <FaBox />
              {!collapsed && "Products"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users">
              <FaUsers />
              {!collapsed && "Users"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders">
              <FaShoppingCart />
              {!collapsed && "Orders"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/shipments">
              <FaTruck />
              {!collapsed && "Shipments"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/returns">
              <FaUndo />
              {!collapsed && "Returns"}
            </NavLink>
          </li>
        </ul>

        <button onClick={handleLogout} className="logout-btn">
          {!collapsed && "Logout"}
        </button>
      </div>

      {/* Main Area */}
      <div className="admin-main">

        <div className="admin-topbar">
          <div className="topbar-right">
            <FaBell className="top-icon" />
            {darkMode ? (
              <FaSun
                className="top-icon"
                onClick={() => setDarkMode(false)}
              />
            ) : (
              <FaMoon
                className="top-icon"
                onClick={() => setDarkMode(true)}
              />
            )}
          </div>
        </div>

        <div className="admin-content">
          {children}
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;