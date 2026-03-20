import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiFilter, FiGrid, FiRefreshCw, FiSearch, FiSliders } from "react-icons/fi";
import ProductCard from "../components/product/ProductCard";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import { formatPrice, normalizeProduct } from "../utils/normalize";
import "../styles/pages/shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", categoryName: "All" }]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories()
        ]);

        setCategories([{ id: "all", categoryName: "All" }, ...categoriesData]);
        setProducts(productsData.map((product) => normalizeProduct(product, categoriesData)));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("We couldn't load the shop right now. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredCategories = categories
    .filter((item) => item.categoryName !== "All")
    .map((item) => ({
      ...item,
      count: products.filter((product) => product.categoryName === item.categoryName).length
    }))
    .filter((item) => item.count > 0)
    .slice(0, 4);

  const categoryCount = categories.filter((item) => item.categoryName !== "All").length;
  const lowestPrice = products.length
    ? Math.min(...products.map((product) => Number(product.displayPrice || 0)))
    : 0;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.categoryName === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (sortBy === "price-low") {
      return Number(firstProduct.displayPrice || 0) - Number(secondProduct.displayPrice || 0);
    }

    if (sortBy === "price-high") {
      return Number(secondProduct.displayPrice || 0) - Number(firstProduct.displayPrice || 0);
    }

    if (sortBy === "name") {
      return firstProduct.name.localeCompare(secondProduct.name);
    }

    return 0;
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
  };

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="shop-glow"></div>
        <div className="shop-glow secondary"></div>
        <div className="container">
          <div className="shop-hero-layout">
            <motion.div
              className="shop-header-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="shop-tag">AyurKisan Shop</span>
              <h1>
                A refined <span className="text-gradient">Ayurvedic shop</span> for daily wellness
              </h1>
              <p>
                Browse trusted herbal essentials with a cleaner catalog, quick filtering,
                and simple product discovery.
              </p>

              <div className="shop-hero-actions">
                <a href="#shop-catalog" className="shop-primary-btn">
                  Explore Shop <FiArrowRight />
                </a>
                <Link to="/contact" className="shop-secondary-btn">
                  Ask for Guidance
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="shop-hero-panel-light"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="shop-stat-row">
                <div className="shop-stat-item">
                  <span className="stat-value">{products.length}</span>
                  <span className="stat-label">Curated Items</span>
                </div>
                <div className="shop-stat-divider"></div>
                <div className="shop-stat-item">
                  <span className="stat-value">{categoryCount}</span>
                  <span className="stat-label">Categories</span>
                </div>
                <div className="shop-stat-divider"></div>
                <div className="shop-stat-item">
                  <span className="stat-value">{formatPrice(lowestPrice)}</span>
                  <span className="stat-label">Starting at</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="shop-highlights-light container">
        <div className="shop-highlights-row">
          <span className="highlights-label">Popular picks:</span>
          {featuredCategories.map((item) => (
            <button
              key={item.id || item.categoryName}
              type="button"
              className={`shop-chip ${category === item.categoryName ? "active" : ""}`}
              onClick={() => setCategory(item.categoryName)}
            >
              {item.categoryName} <span className="chip-count">{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="shop-content container" id="shop-catalog">
        <div className="shop-controls-bar">
          <div className="search-input-group">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="filter-select-group">
            <FiFilter className="filter-icon" />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.slice(1).map((item) => (
                <option key={item.id || item.categoryName} value={item.categoryName}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-select-group">
            <FiSliders className="sort-icon" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Sort: Price Low - High</option>
              <option value="price-high">Sort: Price High - Low</option>
              <option value="name">Sort: Name A - Z</option>
            </select>
          </div>

          <button type="button" className="shop-reset-btn" onClick={resetFilters}>
            <FiRefreshCw />
            Reset
          </button>
        </div>

        <div className="shop-results-bar">
          <div className="results-count">
            Showing {sortedProducts.length} result(s)
            {search ? ` for "${search}"` : ""}
            {category !== "All" ? ` in ${category}` : " across the full shop"}
          </div>
        </div>

        {loading ? (
          <div className="shop-feedback-state">
            <div className="shop-spinner"></div>
            <h3>Loading products</h3>
            <p>We are preparing the catalog for you.</p>
          </div>
        ) : error ? (
          <div className="shop-feedback-state error">
            <h3>Shop unavailable</h3>
            <p>{error}</p>
            <button type="button" onClick={() => window.location.reload()} className="reset-btn">
              Try Again
            </button>
          </div>
        ) : sortedProducts.length > 0 ? (
          <motion.div
            className="shop-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {sortedProducts.map((product) => (
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
            <p>Try a different keyword, switch category, or clear the current filters.</p>
            <button onClick={resetFilters} className="reset-btn">
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;
