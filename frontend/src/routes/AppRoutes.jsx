import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import RetailerLayout from "../layouts/RetailerLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CustomerSignup from "../pages/CustomerSignup";
import FeedbackPage from "../pages/FeedbackPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import OrderConfirmation from "../pages/OrderConfirmation";
import ProductDetails from "../pages/ProductDetails";
import RetailerSignup from "../pages/RetailerSignup";
import Shop from "../pages/Shop";
import TrackOrder from "../pages/TrackOrder";
import AdminLogin from "../pages/admin/AdminLogin";
import AddProduct from "../pages/admin/AddProduct";
import AdminDashboard from "../pages/admin/AdminDashboard";
import EditHomepage from "../pages/admin/EditHomepage";
import EditProduct from "../pages/admin/EditProduct";
import ManageAdmins from "../pages/admin/ManageAdmins";
import ManageCategories from "../pages/admin/ManageCategories";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageReturns from "../pages/admin/ManageReturns";
import ManageShipments from "../pages/admin/ManageShipments";
import ManageUsers from "../pages/admin/ManageUsers";
import Address from "../pages/customer/Address";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import MyOrders from "../pages/customer/MyOrders";
import Profile from "../pages/customer/Profile";
import Wishlist from "../pages/customer/Wishlist";
import RetailerDashboard from "../pages/retailer/RetailerDashboard";
import RetailerOrders from "../pages/retailer/RetailerOrders";
import RetailerProducts from "../pages/retailer/RetailerProducts";
import RetailerAddProduct from "../pages/retailer/AddProductsRetailer";
import SalesAnalytics from "../pages/retailer/SalesAnalytics";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup/customer" element={<CustomerSignup />} />
      <Route path="/signup/retailer" element={<RetailerSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit-homepage" element={<EditHomepage />} />
        <Route path="/admin/manage-admins" element={<ManageAdmins />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/shipments" element={<ManageShipments />} />
        <Route path="/admin/returns" element={<ManageReturns />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRole="CUSTOMER">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/orders" element={<MyOrders />} />
        <Route path="/customer/wishlist" element={<Wishlist />} />
        <Route path="/customer/address" element={<Address />} />
        <Route path="/customer/profile" element={<Profile />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRole="CUSTOMER">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/track-order/:orderId" element={<TrackOrder />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRole="RETAILER">
            <RetailerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
        <Route path="/retailer/products" element={<RetailerProducts />} />
        <Route path="/retailer/add-product" element={<RetailerAddProduct />} />
        <Route path="/retailer/orders" element={<RetailerOrders />} />
        <Route path="/retailer/analytics" element={<SalesAnalytics />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
