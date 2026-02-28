import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

import CustomerSignup from "../pages/CustomerSignup";
import RetailerSignup from "../pages/RetailerSignup";



import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminLogin from "../pages/admin/AdminLogin";
import ManageAdmins from "../pages/admin/ManageAdmins";
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import ManageCategories from "../pages/admin/ManageCategories";
import EditProduct from "../pages/admin/EditProduct";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageShipments from "../pages/admin/ManageShipments";
import ManageReturns from "../pages/admin/ManageReturns";

/* Protected Route */
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/retailer" element={<RetailerSignup />} />

        
       
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />

 {/* ---------------- ADMIN LOGIN ---------------- */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ---------------- PROTECTED ADMIN ROUTES ---------------- */}
     <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/manage-admins"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <ManageAdmins />
    </ProtectedRoute>
  }
/>

      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageCategories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/shipments"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageShipments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/returns"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageReturns />
          </ProtectedRoute>
        }
      />

      {/* ---------------- 404 ---------------- */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;