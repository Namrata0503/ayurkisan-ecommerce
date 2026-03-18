import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [deleteCategory, setDeleteCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch categories", err);
      setError("Could not load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditCategory(null);
    setCategoryName("");
    setDescription("");
    setOpenModal(true);
  };

  const handleOpenEdit = (category) => {
    setEditCategory(category);
    setCategoryName(category.categoryName || "");
    setDescription(category.description || "");
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.warning("Category name is required.");
      return;
    }

    const payload = {
      categoryName: categoryName.trim(),
      description: description.trim()
    };

    try {
      if (editCategory) {
        await categoryService.updateCategory(editCategory.categoryName, payload);
      } else {
        await categoryService.addCategory(payload);
      }
      await fetchCategories();
      setOpenModal(false);
      toast.success(`Category ${editCategory ? "updated" : "created"} successfully.`);
    } catch (err) {
      console.error("Failed to save category", err);
      toast.error(err.response?.data?.message || "Failed to save category.");
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) {
      return;
    }

    try {
      await categoryService.deleteCategory(deleteCategory.categoryName);
      setCategories((current) => current.filter((cat) => cat.id !== deleteCategory.id));
      setDeleteCategory(null);
      toast.success("Category deleted successfully.");
    } catch (err) {
      console.error("Failed to delete category", err);
      toast.error(err.response?.data?.message || "Failed to delete category.");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    (cat.categoryName || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="loader"></div>
        <p>Fetching Categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <p>{error}</p>
        <button onClick={fetchCategories} className="primary-btn">Retry</button>
      </div>
    );
  }

  return (
    <motion.div className="admin-page" variants={containerVariants} initial="hidden" animate="show">
      <div className="admin-header" style={{ marginBottom: "25px" }}>
        <div>
          <h2>Manage Categories</h2>
          <span className="admin-count">{categories.length} Total Categories</span>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search category..."
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button className="primary-btn" onClick={handleOpenAdd}>
            + Add Category
          </button>
        </div>
      </div>

      <motion.div className="admin-card" variants={itemVariants}>
        <div className="table-wrapper">
          <table className="admin-table gradient-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredCategories.map((category) => (
                  <motion.tr
                    key={category.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <span className="category-badge" style={{ fontSize: "14px", padding: "8px 16px" }}>
                        {category.categoryName}
                      </span>
                    </td>
                    <td>{category.description || "No description"}</td>
                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => handleOpenEdit(category)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => setDeleteCategory(category)}>
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
        {filteredCategories.length === 0 ? <div className="empty-text">No categories found matching your search.</div> : null}
      </motion.div>

      <AnimatePresence>
        {openModal ? (
          <div className="modal-overlay">
            <motion.div
              className="modal-box premium-modal admin-form"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ maxWidth: "420px", padding: "30px", background: "white", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
            >
              <h3 style={{ marginBottom: "20px", color: "#1b4332", fontSize: "22px", fontWeight: "700" }}>
                {editCategory ? "Edit Category" : "Add New Category"}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-section">
                  <label style={{ fontSize: "14px", fontWeight: "500", color: "#4b5563" }}>Name</label>
                  <input
                    type="text"
                    placeholder="Enter category name..."
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                    className="search-input"
                    autoFocus
                  />
                </div>

                <div className="form-section">
                  <label style={{ fontSize: "14px", fontWeight: "500", color: "#4b5563" }}>Description</label>
                  <textarea
                    placeholder="Short category description..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="search-input"
                    rows="4"
                  />
                </div>

                <div className="modal-actions" style={{ display: "flex", gap: "12px", marginTop: "10px", justifyContent: "flex-end" }}>
                  <button className="primary-btn" onClick={handleSave} style={{ minWidth: "100px" }}>
                    {editCategory ? "Update" : "Create"}
                  </button>
                  <button className="secondary-btn" onClick={() => setOpenModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {deleteCategory ? (
          <div className="modal-overlay">
            <motion.div
              className="modal-box confirm-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ maxWidth: "400px", padding: "30px", background: "white", borderRadius: "24px", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
            >
              <h3 style={{ marginBottom: "10px", color: "#1f2937", fontSize: "20px" }}>Delete Category?</h3>
              <p style={{ color: "#6b7280", marginBottom: "30px", lineHeight: "1.5" }}>
                Are you sure you want to delete <strong>{deleteCategory.categoryName}</strong>?
              </p>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <button className="primary-btn" style={{ background: "#dc2626" }} onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button className="secondary-btn" onClick={() => setDeleteCategory(null)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default ManageCategories;
