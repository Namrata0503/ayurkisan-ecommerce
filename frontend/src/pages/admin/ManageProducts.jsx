import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import productService from "../../services/productService";
import { formatPrice } from "../../utils/normalize";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.categoryName || categoryId;

  const handleDelete = async () => {
    if (!deleteProduct) {
      return;
    }

    try {
      await productService.deleteProduct(deleteProduct.productName);
      setProducts((current) => current.filter((product) => product.id !== deleteProduct.id));
      setDeleteProduct(null);
      toast.success("Product deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase()) ||
    product.brand.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Fetching Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button onClick={fetchProducts} className="primary-btn">Retry</button>
      </div>
    );
  }

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage Products</h2>
          <span className="admin-count">{products.length} Total Registered Products</span>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by name or brand..."
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="primary-btn" onClick={() => navigate("/admin/add-product")}>
            + Add Product
          </button>
        </div>
      </div>

      <motion.div className="admin-card" variants={itemVariants}>
        <div className="table-wrapper">
          <table className="admin-table gradient-table">
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <td>
                      <div className="admin-profile">
                        {product.productImage ? (
                          <img src={product.productImage} alt={product.productName} className="product-avatar" style={{ objectFit: "cover" }} />
                        ) : (
                          <div className="product-avatar">{product.productName.charAt(0).toUpperCase()}</div>
                        )}
                        <div>
                          <div className="admin-name">{product.productName}</div>
                          <div style={{ fontSize: "12px", color: "#666" }}>{product.brand}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">{getCategoryName(product.categoryId)}</span>
                    </td>

                    <td>
                      <div className="price-text">{formatPrice(product.finalPrice)}</div>
                      {product.discount > 0 ? (
                        <div style={{ fontSize: "11px", color: "#666", textDecoration: "line-through" }}>
                          {formatPrice(product.price)}
                        </div>
                      ) : null}
                    </td>

                    <td>
                      <div style={{ marginBottom: "4px", fontSize: "13px", fontWeight: "600" }}>{product.stockQuantity} Left</div>
                      <span className={`status-badge ${product.stockQuantity > 20 ? "status-active" : product.stockQuantity > 0 ? "status-pending" : "status-disabled"}`}>
                        {product.stockQuantity > 20 ? "In Stock" : product.stockQuantity > 0 ? "Low Stock" : "Out of Stock"}
                      </span>
                    </td>

                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => navigate(`/admin/edit-product/${product.id}`)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => setDeleteProduct(product)}>
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
        {filteredProducts.length === 0 ? <div className="empty-text">No products match your search.</div> : null}
      </motion.div>

      {deleteProduct ? (
        <div className="modal-overlay">
          <motion.div
            className="modal-box confirm-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "30px", background: "white", borderRadius: "20px", maxWidth: "400px", textAlign: "center" }}
          >
            <h3 style={{ color: "#dc2626", marginBottom: "15px" }}>Remove Product?</h3>
            <p style={{ color: "#666", marginBottom: "25px" }}>
              Are you sure you want to delete <strong>{deleteProduct.productName}</strong>?
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button className="primary-btn" style={{ background: "#dc2626" }} onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="secondary-btn" onClick={() => setDeleteProduct(null)}>
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </motion.div>
  );
}

export default ManageProducts;
