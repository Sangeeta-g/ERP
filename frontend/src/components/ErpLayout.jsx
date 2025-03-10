import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Sidebar from "./Sidebar";

const ErpLayout = () => {
  return (
    <div className="erp-layout">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Use Outlet to render nested routes */}
      </div>
    </div>
  );
};

export default ErpLayout;