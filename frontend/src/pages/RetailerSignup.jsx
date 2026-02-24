import { useState } from "react";
import "../styles/auth.css";

function RetailerSignup() {
  const [form, setForm] = useState({
    firmName: "",
    gstNumber: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Retailer Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="firmName"
            placeholder="Firm Name"
            onChange={handleChange}
            required
          />

          <input
            name="gstNumber"
            placeholder="GST Number"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RetailerSignup;