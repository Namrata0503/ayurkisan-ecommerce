import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories");
    } finally {
      setFetchingCategories(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productService.addProduct({
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        stockQuantity: parseInt(formData.stockQuantity)
      });
      navigate("/admin/products");
    } catch (err) {
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="admin-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="admin-header" variants={itemVariants} style={{ marginBottom: "25px" }}>
        <div>
          <h2>Add New Product</h2>
          <p style={{ color: "#6b7280", marginTop: "5px" }}>Create a new luxury entry for the product catalog.</p>
        </div>
      </motion.div>

      <motion.div className="admin-card" variants={itemVariants}>
        <form className="admin-form-grid" onSubmit={handleSubmit}>

          {/* LEFT COLUMN: BASIC & PRICING */}
          <div className="form-column">
            <div className="form-section">
              <h3><i className="fas fa-info-circle"></i> Identity & Categorization</h3>
              
              <div className="input-group">
                <label>Product Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="productName"
                  placeholder="e.g. Premium Aloe Extract"
                  className="search-input"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Target Category <span className="required">*</span></label>
                <select
                  name="categoryId"
                  className="search-input"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  disabled={fetchingCategories}
                >
                  <option value="">{fetchingCategories ? "Loading..." : "Assign Category"}</option>
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
                    <input type="text" name="brand" placeholder="Ayurkisan" className="search-input" value={formData.brand} onChange={handleChange} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Weight / Vol</label>
                    <input type="text" name="weight" placeholder="500ml / 250g" className="search-input" value={formData.weight} onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label>Detailed Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the product's benefits and features..."
                  className="search-input"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-wallet"></i> Economics & Stock</h3>
              <div className="input-group-row">
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Base Price (₹)</label>
                    <input type="number" name="price" placeholder="0.00" className="search-input" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Discount (%)</label>
                    <input type="number" name="discount" placeholder="0" className="search-input" value={formData.discount} onChange={handleChange} />
                </div>
              </div>

              <div className="price-preview-luxury">
                <span>Final Consumer Price</span>
                <span className="price-val">₹{finalPrice || "0.00"}</span>
              </div>

              <div className="input-group">
                <label>Inventory Quantity</label>
                <input type="number" name="stockQuantity" placeholder="0" className="search-input" value={formData.stockQuantity} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SPECS & MEDIA */}
          <div className="form-column">
            <div className="form-section">
              <h3><i className="fas fa-microscope"></i> Lifecycle & Composition</h3>
              <div className="input-group-row">
                <div className="input-group" style={{ flex: 1 }}>
                    <label>MFG Date</label>
                    <input type="date" name="manufacturingDate" className="search-input" value={formData.manufacturingDate} onChange={handleChange} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Expiry Date</label>
                    <input type="date" name="expiryDate" className="search-input" value={formData.expiryDate} onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                  <label>Ingredients</label>
                  <textarea name="ingredients" placeholder="List key components..." className="search-input" value={formData.ingredients} onChange={handleChange} rows="2" />
              </div>

              <div className="input-group">
                  <label>Usage & Dosage</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" name="dosage" placeholder="2 caps daily" className="search-input" style={{ flex: 1 }} value={formData.dosage} onChange={handleChange} />
                    <input type="text" name="usageInstructions" placeholder="After meals" className="search-input" style={{ flex: 1 }} value={formData.usageInstructions} onChange={handleChange} />
                  </div>
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-image"></i> Visual Representation</h3>
              <div className="input-group">
                <label>Media Source URL</label>
                <input
                  type="url"
                  name="productImage"
                  placeholder="https://example.com/image.jpg"
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
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Image Preview Area</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="form-footer-luxury">
            <button type="button" className="secondary-btn" onClick={() => navigate("/admin/products")} disabled={loading}>
                Discard
            </button>
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <span className="loader-small"></span> : <><i className="fas fa-check"></i> Finalize Product</>}
            </button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
}

export default AddProduct;