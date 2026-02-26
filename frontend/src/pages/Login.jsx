import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary local login simulation
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", form.role);

    if (form.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (form.role === "CUSTOMER") {
      navigate("/customer-dashboard");
    } else {
      navigate("/retailer-dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Ayurkisan 🌿</h2>

        <form onSubmit={handleSubmit}>
          <select name="role" onChange={handleChange}>
            <option value="CUSTOMER">Customer</option>
            <option value="RETAILER">Retailer</option>
            <option value="ADMIN">Admin</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;