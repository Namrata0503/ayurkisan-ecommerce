import { Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  return (
    <div className="auth-standalone">

      <div className="standalone-card">
        <h2>Create Account 🌱</h2>

        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />

        <button className="auth-btn">Sign Up</button>

        <p className="auth-footer">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>

    </div>
  );
}

export default Register;
