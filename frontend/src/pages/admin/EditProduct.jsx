import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [oldName, setOldName] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    brand: "",
    price: "",
    discount: "0",
    stockQuantity: "",
    categoryId: "",
    ingredients: "",
    usageInstructions: "",
    dosage: "",
    expiryDate: "",
    manufacturingDate: "",
    weight: "",
    productImage: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [product, cats] = await Promise.all([
        productService.getProductById(id),
        categoryService.getAllCategories()
      ]);
      
      setFormData({
        ...product,
        price: product.price?.toString() || "",
        discount: product.discount?.toString() || "0",
        stockQuantity: product.stockQuantity?.toString() || "",
      });
      setOldName(product.productName);
      setCategories(cats);
    } catch (err) {
      console.error("Error loading product", err);
      alert("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const finalPrice =
    formData.price && formData.discount
      ? (formData.price - (formData.price * formData.discount) / 100).toFixed(2)
      : formData.price;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await productService.updateProduct(oldName, {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        stockQuantity: parseInt(formData.stockQuantity)
      });
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to update product.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Initializing Editor...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="admin-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="admin-header" variants={itemVariants} style={{ marginBottom: "25px" }}>
        <div>
          <h2>Modify Product Catalog</h2>
          <p style={{ color: "#6b7280", marginTop: "5px" }}>Editing: <span style={{ fontWeight: '600', color: '#111827' }}>{oldName}</span></p>
        </div>
      </motion.div>

      <motion.div className="admin-card" variants={itemVariants}>
        <form className="admin-form-grid" onSubmit={handleUpdate}>

          <div className="form-column">
            <div className="form-section">
              <h3><i className="fas fa-edit"></i> Essential Identity</h3>
              
              <div className="input-group">
                <label>Product Title</label>
                <input
                  type="text"
                  name="productName"
                  className="search-input"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Category Placement</label>
                <select
                  name="categoryId"
                  className="search-input"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id || cat._id} value={cat.id || cat._id}>
                        {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group-row">
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Brand</label>
                    <input type="text" name="brand" className="search-input" value={formData.brand} onChange={handleChange} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Size / Weight</label>
                    <input type="text" name="weight" className="search-input" value={formData.weight} onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label>Narrative Description</label>
                <textarea
                  name="description"
                  className="search-input"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-coins"></i> Valuation & Inventory</h3>
              <div className="input-group-row">
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Market Price (₹)</label>
                    <input type="number" name="price" className="search-input" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Rebate Percentage (%)</label>
                    <input type="number" name="discount" className="search-input" value={formData.discount} onChange={handleChange} />
                </div>
              </div>

              <div className="price-preview-luxury">
                <span>Calculated Consumer Value</span>
                <span className="price-val">₹{finalPrice || "0.00"}</span>
              </div>

              <div className="input-group">
                <label>Current Stock Count</label>
                <input type="number" name="stockQuantity" className="search-input" value={formData.stockQuantity} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-column">
            <div className="form-section">
              <h3><i className="fas fa-flask"></i> Technical Specifications</h3>
              <div className="input-group-row">
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Production Date</label>
                    <input type="date" name="manufacturingDate" className="search-input" value={formData.manufacturingDate} onChange={handleChange} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Best Before</label>
                    <input type="date" name="expiryDate" className="search-input" value={formData.expiryDate} onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                  <label>Ingredient Profile</label>
                  <textarea name="ingredients" className="search-input" value={formData.ingredients} onChange={handleChange} rows="2" />
              </div>

              <div className="input-group">
                  <label>Usage Guidelines</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" name="dosage" placeholder="Dosage" className="search-input" style={{ flex: 1 }} value={formData.dosage} onChange={handleChange} />
                    <input type="text" name="usageInstructions" placeholder="Protocol" className="search-input" style={{ flex: 1 }} value={formData.usageInstructions} onChange={handleChange} />
                  </div>
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-camera-retro"></i> Gallery Image</h3>
              <div className="input-group">
                <label>External URL</label>
                <input
                  type="url"
                  name="productImage"
                  className="search-input"
                  value={formData.productImage}
                  onChange={handleChange}
                />
              </div>

              <div className="luxury-preview-box">
                {formData.productImage ? (
                  <img src={formData.productImage} alt="Preview" className="luxury-preview-img" />
                ) : (
                  <div className="preview-placeholder">
                    <i className="fas fa-image"></i>
                    <p>No Media Link</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-footer-luxury">
            <button type="button" className="secondary-btn" onClick={() => navigate("/admin/products")} disabled={updating}>
                Abandon Changes
            </button>
            <button type="submit" className="primary-btn" disabled={updating}>
              {updating ? <span className="loader-small"></span> : <><i className="fas fa-save"></i> Push Updates</>}
            </button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
}

export default EditProduct;