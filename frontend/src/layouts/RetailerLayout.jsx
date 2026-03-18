import RetailerSidebar from "../components/RetailerSidebar";
import { Outlet } from "react-router-dom";
import "../styles/dashboard/retailerDashboard.css";

function RetailerLayout() {
  return (
    <div className="retailer-container">
      <RetailerSidebar />
      <div className="retailer-content">
        <Outlet />
      </div>
    </div>
  );
}

export default RetailerLayout;
