import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/auth.css";

function RetailerSignup() {
  const [form, setForm] = useState({
    firmName: "",
    gstNumber: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Retailer Registered Successfully");

    console.log(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Retailer Registration</h2>

        <form onSubmit={handleSubmit}>
          <input name="firmName" placeholder="Firm Name" onChange={handleChange} />
          <input name="gstNumber" placeholder="GST Number" onChange={handleChange} />
          <input name="ownerName" placeholder="Owner Name" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RetailerSignup;