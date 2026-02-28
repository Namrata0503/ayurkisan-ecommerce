import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { retailerSignup } from "../services/authService";
import "../styles/auth.css";

function RetailerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firmName: "",
    ownerName: "",
    address: "",
    email: "",
    phoneNumber: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firmName || !form.email || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await retailerSignup({
        firmName: form.firmName,
        ownerName: form.ownerName,
        address: form.address,
        email: form.email,
        phoneNumber: form.phoneNumber,
        gstNumber: form.gstNumber,
        password: form.password,
      });

      toast.success("Retailer Registered Successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Retailer Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Retailer Registration</h2>

        <form onSubmit={handleSubmit}>
          <input name="firmName" placeholder="Firm Name" onChange={handleChange} />
          <input name="ownerName" placeholder="Owner Name" onChange={handleChange} />
          <input name="address" placeholder="Business Address" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
          <input name="gstNumber" placeholder="GST Number" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RetailerSignup;