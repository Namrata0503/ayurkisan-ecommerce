import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function SignupSelection() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Select Account Type</h2>

        <button
          onClick={() => navigate("/signup/customer")}
          style={{ marginBottom: "15px" }}
        >
          Individual Customer
        </button>

        <button
          onClick={() => navigate("/signup/retailer")}
        >
          Retailer / Bulk Buyer
        </button>
      </div>
    </div>
  );
}

export default SignupSelection;