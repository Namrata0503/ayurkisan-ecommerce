import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// App Routes
import AppRoutes from "./routes/AppRoutes";

/* GLOBAL STYLES */
import "./styles/global/designSystem.css";
import "./styles/global/layout.css";
import "./styles/components/button.css";
import "./styles/global/cards.css";
import "./styles/global/glass.css";
import "./styles/global/animations.css";
import "./styles/global/typography.css";

// Context
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2500} />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);
