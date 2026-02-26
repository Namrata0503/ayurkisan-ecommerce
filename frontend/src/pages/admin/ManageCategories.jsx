import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Modal from "../../components/Modal";
import "../../styles/admin.css";

function ManageCategories() {

  const [categories, setCategories] = useState([
    { id: 1, name: "Immunity Booster" },
    { id: 2, name: "Hair Care" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const handleOpenAdd = () => {
    setEditCategory(null);
    setCategoryName("");
    setOpenModal(true);
  };

  const handleOpenEdit = (category) => {
    setEditCategory(category);
    setCategoryName(category.name);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!categoryName.trim()) return;

    if (editCategory) {
      setCategories(categories.map(cat =>
        cat.id === editCategory.id
          ? { ...cat, name: categoryName }
          : cat
      ));
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName
      };
      setCategories([...categories, newCategory]);
    }

    setOpenModal(false);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

 return (
    <AdminLayout>
     
      <div className="admin-container">
        <div className="admin-header">
          <h1>Manage Categories</h1>
          <button className="add-btn" onClick={handleOpenAdd}>
            + Add Category
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleOpenEdit(category)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2>{editCategory ? "Edit Category" : "Add Category"}</h2>

        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <button
          className="add-btn"
          style={{ marginTop: "20px", width: "100%" }}
          onClick={handleSave}
        >
          Save
        </button>
      </Modal>

     
  </AdminLayout>
);
}

export default ManageCategories;