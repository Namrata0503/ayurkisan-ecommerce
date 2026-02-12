import { useState } from "react";
import "../styles/auth.css";

function Login() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`auth-wrapper ${isActive ? "active" : ""}`}>

      {/* LOGIN FORM */}
      <div className="form-container sign-in">
        <form>
          <h2>Welcome Back 🌿</h2>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="auth-btn">Login</button>
        </form>
      </div>

      {/* REGISTER FORM */}
      <div className="form-container sign-up">
        <form>
          <h2>Create Account 🌱</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="auth-btn">Sign Up</button>
        </form>
      </div>

      {/* GREEN SLIDING PANEL */}
      <div className="toggle-container">
        <div className="toggle-content">
          {!isActive ? (
            <>
              <h1>Join Ayurkisan 🌱</h1>
              <p>Start your herbal wellness journey</p>
              <button
                className="ghost-btn"
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h1>Welcome Back 🌿</h1>
              <p>Already part of Ayurkisan?</p>
              <button
                className="ghost-btn"
                onClick={() => setIsActive(false)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default Login;
