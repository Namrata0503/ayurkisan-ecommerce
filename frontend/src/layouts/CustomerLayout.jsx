import CustomerSidebar from "../components/CustomerSidebar";
import { Outlet } from "react-router-dom";
import "../styles/dashboard/customerDashboard.css";

function CustomerLayout() {
  return (
    <div className="customer-container">
      <CustomerSidebar />
      <div className="customer-content">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;
