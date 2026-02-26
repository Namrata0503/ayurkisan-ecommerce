import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/admin.css";

function ManageUsers() {

  // Dummy user data (later from backend)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ravi Sharma",
      email: "ravi@gmail.com",
      role: "CUSTOMER",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Sneha Traders",
      email: "sneha@retail.com",
      role: "RETAILER",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@ayurkisan.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
  ]);

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "ACTIVE"
                  ? "DISABLED"
                  : "ACTIVE",
            }
          : user
      )
    );
  };

  return (
  <AdminLayout>      

      <div className="admin-container">
        <h1>Manage Users</h1>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    style={{
                      color:
                        user.status === "ACTIVE"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <span
  className={`status-badge ${
    user.status === "ACTIVE"
      ? "status-active"
      : "status-disabled"
  }`}
>
  {user.status}
</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
   
  </AdminLayout>
);
}

export default ManageUsers;