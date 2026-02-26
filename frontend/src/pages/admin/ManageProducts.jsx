import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/admin.css";

function ManageProducts() {
  const navigate = useNavigate();

  // Temporary dummy products (later from backend)
  const products = [
    {
      id: 1,
      productName: "Aloe Vera Juice",
      category: "Immunity Booster",
      price: 299,
      stockQuantity: 50,
    },
    {
      id: 2,
      productName: "Moringa Powder",
      category: "Digestive Care",
      price: 249,
      stockQuantity: 30,
    },
  ];

 return (
    <AdminLayout>
      

      <div className="admin-container">
        <div className="admin-header">
          <h1>Manage Products</h1>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/add-product")}
          >
            + Add Product
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   
    
  </AdminLayout>
);
}

export default ManageProducts;