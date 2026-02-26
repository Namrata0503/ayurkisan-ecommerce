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
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import ManageCategories from "../pages/admin/ManageCategories";
import EditProduct from "../pages/admin/EditProduct";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageShipments from "../pages/admin/ManageShipments";
import ManageReturns from "../pages/admin/ManageReturns";



function AppRoutes() {
  return (
    <Router>
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

{/* Admin Routes */}
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/shipments" element={<ManageShipments />} />
        <Route path="/admin/returns" element={<ManageReturns />} />
        
        
        

      </Routes>
    </Router>
  );
}

export default AppRoutes;
