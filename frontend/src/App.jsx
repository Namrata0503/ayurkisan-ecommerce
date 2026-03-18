import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";

function AppRoutes() {
  return (
    <Routes>

      {/* Pages with Navbar + Footer */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Route>

    </Routes>
  );
}

export default AppRoutes;