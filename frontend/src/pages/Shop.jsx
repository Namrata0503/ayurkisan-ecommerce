import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiSearch } from "react-icons/fi";
import ProductCard from "../components/product/ProductCard";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import { normalizeProduct } from "../utils/normalize";
import "../styles/pages/shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", categoryName: "All" }]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories()
        ]);

        setCategories([{ id: "all", categoryName: "All" }, ...categoriesData]);
        setProducts(productsData.map((product) => normalizeProduct(product, categoriesData)));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.categoryName === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="shop-glow"></div>
        <div className="container">
          <motion.div
            className="shop-header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="shop-tag">Our Collection</span>
            <h1>Shop Ayurvedic <span className="text-gradient">Products</span></h1>
            <p>Find herbal wellness essentials with category filters, fast search, and product details powered by the backend API.</p>
          </motion.div>
        </div>
      </section>

      <section className="shop-content container">
        <div className="shop-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search herbal remedies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="category-filters">
            <FiFilter className="filter-icon" />
            <div className="pill-group">
              {categories.map((item) => (
                <button
                  key={item.id || item.categoryName}
                  className={`filter-pill ${category === item.categoryName ? "active" : ""}`}
                  onClick={() => setCategory(item.categoryName)}
                >
                  {item.categoryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-count">
          Showing {filteredProducts.length} result(s) for "{category}"
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            className="shop-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try a different keyword or reset your category filter.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="reset-btn">
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;
