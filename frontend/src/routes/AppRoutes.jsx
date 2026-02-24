import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignupSelection from "../pages/SignupSelection";
import CustomerSignup from "../pages/CustomerSignup";
import RetailerSignup from "../pages/RetailerSignup";

import AdminDashboard from "../dashboards/AdminDashboard";
import CustomerDashboard from "../dashboards/CustomerDashboard";
import RetailerDashboard from "../dashboards/RetailerDashboard";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignupSelection />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/retailer" element={<RetailerSignup />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />

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
