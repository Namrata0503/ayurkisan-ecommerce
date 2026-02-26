import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/admin.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    brand: "",
    price: "",
    discount: "",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    alert("Product Submitted (Frontend Only)");
  };

return (
    <AdminLayout>
      
      <div className="admin-container">
        <h1>Add New Product</h1>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            onChange={handleChange}
          />

          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
          />

          <select
            name="categoryId"
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="immunity">Immunity Booster</option>
            <option value="hair">Hair Care</option>
            <option value="skin">Skin Care</option>
            <option value="digestive">Digestive Care</option>
          </select>

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            onChange={handleChange}
          />

          <textarea
            name="usageInstructions"
            placeholder="Usage Instructions"
            onChange={handleChange}
          />

          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            onChange={handleChange}
          />

          <input
            type="date"
            name="manufacturingDate"
            onChange={handleChange}
          />

          <input
            type="date"
            name="expiryDate"
            onChange={handleChange}
          />

          <input
            type="text"
            name="weight"
            placeholder="Weight (e.g. 250ml, 100g)"
            onChange={handleChange}
          />

          <input
            type="text"
            name="productImage"
            placeholder="Product Image URL"
            onChange={handleChange}
          />

          <button type="submit" className="add-btn">
            Save Product
          </button>
        </form>
      </div>

  </AdminLayout>
);
}

export default AddProduct;