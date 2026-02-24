import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

import CustomerSignup from "../pages/CustomerSignup";
import RetailerSignup from "../pages/RetailerSignup";

import AdminDashboard from "../dashboards/AdminDashboard";
import CustomerDashboard from "../dashboards/CustomerDashboard";
import RetailerDashboard from "../dashboards/RetailerDashboard";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/retailer" element={<RetailerSignup />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/retailer-dashboard"
          element={
            <ProtectedRoute allowedRole="RETAILER">
              <RetailerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
