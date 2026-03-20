import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaList,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaBell,
  FaMoon,
  FaSun,
  FaBars,
  FaSignOutAlt,
  FaDesktop,
  FaHome
} from "react-icons/fa";
import "../styles/dashboard/adminLayout.css";
import logo from "../assets/logo.png";

function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className={`admin-layout ${darkMode ? "dark" : ""}`}>
      <div className="admin-layout-wrapper">

        {/* Sidebar */}
        <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

          <div>
            <div className="sidebar-top">
              <Link to="/" className="admin-logo-link">
                {collapsed ? (
                  <img src={logo} alt="AK" className="sidebar-logo-img mini" />
                ) : (
                  <img src={logo} alt="AyurKisan" className="sidebar-logo-img" />
                )}
              </Link>
              <FaBars
                className="toggle-icon"
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>

            <div className="sidebar-links">
              <NavLink to="/">
                <FaHome />
                {!collapsed && "Go to Home"}
              </NavLink>

              <NavLink to="/admin/dashboard">
                <FaTachometerAlt />
                {!collapsed && "Dashboard"}
              </NavLink>

              <NavLink to="/admin/edit-homepage">
                <FaDesktop />
                {!collapsed && "Edit Homepage"}
              </NavLink>

              <NavLink to="/admin/manage-admins">
                <FaUsers />
                {!collapsed && "Admins"}
              </NavLink>

              <NavLink to="/admin/categories">
                <FaList />
                {!collapsed && "Categories"}
              </NavLink>

              <NavLink to="/admin/products">
                <FaBox />
                {!collapsed && "Products"}
              </NavLink>

              <NavLink to="/admin/users">
                <FaUsers />
                {!collapsed && "Users"}
              </NavLink>

              <NavLink to="/admin/orders">
                <FaShoppingCart />
                {!collapsed && "Orders"}
              </NavLink>

              <NavLink to="/admin/shipments">
                <FaTruck />
                {!collapsed && "Shipments"}
              </NavLink>

              <NavLink to="/admin/returns">
                <FaUndo />
                {!collapsed && "Returns"}
              </NavLink>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            {!collapsed && "Logout"}
          </button>
        </div>

        {/* Main */}
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
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminLayout;