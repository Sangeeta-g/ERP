// import React from 'react'

// const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// export default App

// import React, { useState } from "react";
// import "./components/Sidebar.css";

// const App = () => {
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     const toggleSidebar = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     return (
//         <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//             <div className="sidebar-header">
//                 <span>{isCollapsed ? "MZ" : "Mazer UI"}</span>
//                 <button className="sidebar-toggle" onClick={toggleSidebar}>
//                     <i className="fas fa-bars"></i>
//                 </button>
//             </div>
//             <ul className="sidebar-menu">
//                 <li>
//                     <a href="#">
//                         <i className="fas fa-home"></i>
//                         <span>Dashboard</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#">
//                         <i className="fas fa-file-alt"></i>
//                         <span>Reports</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#">
//                         <i className="fas fa-user"></i>
//                         <span>Profile</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#">
//                         <i className="fas fa-cog"></i>
//                         <span>Settings</span>
//                     </a>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Attendance from "./components/Attendance";
import Payroll from "./components/Payroll";
import ErpLayout from "./components/ErpLayout";
import Login from "./components/auth/Login";
import NotFound from "./pages/NotFound";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (e.g., Login) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (ERP Layout with Sidebar) */}
        <Route path="/" element={<ErpLayout />}>
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;