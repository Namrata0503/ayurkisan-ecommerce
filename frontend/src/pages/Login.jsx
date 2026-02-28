import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/auth/login", form);

    console.log("FULL RESPONSE:", response.data);   
    console.log("ROLE FROM BACKEND:", response.data.role); 

    const { token, role, userId } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);

    console.log("ROLE SAVED:", localStorage.getItem("role")); 

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    }

  } catch (error) {
    alert("Invalid Admin Credentials");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Ayurkisan 🌿</h2>

        <form onSubmit={handleSubmit}>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="CUSTOMER">Customer</option>
            <option value="RETAILER">Retailer</option>
            <option value="ADMIN">Admin</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;