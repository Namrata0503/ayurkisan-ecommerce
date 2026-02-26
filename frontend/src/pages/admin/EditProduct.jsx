import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/admin.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary dummy product (later fetch from backend)
  const [formData, setFormData] = useState({
    productName: "Aloe Vera Juice",
    description: "Pure herbal juice",
    brand: "Ayurkisan",
    price: 299,
    discount: 10,
    stockQuantity: 50,
    weight: "500ml",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Product:", formData);
    alert("Product Updated (Frontend Only)");
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
     

      <div className="admin-container">
        <h1>Edit Product (ID: {id})</h1>

        <form className="admin-form" onSubmit={handleUpdate}>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
          />

          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />

          <button type="submit" className="add-btn">
            Update Product
          </button>
        </form>
      </div>

      </AdminLayout>
);
}

export default EditProduct;